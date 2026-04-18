#!/usr/bin/env node
// scripts/extract-webflow-content.mjs
// Phase 1 migration blog+guides : extraction Webflow → JSON local + assets.
//
// Usage :
//   node scripts/extract-webflow-content.mjs           # full run
//   node scripts/extract-webflow-content.mjs --dry     # no writes, no downloads
//   node scripts/extract-webflow-content.mjs --skip-images   # JSON only
//
// Inputs  : .env.local (WEBFLOW_*) + sessions/fr-subdomain-mapping-v3.csv
// Outputs : content/{blog,guides}/{fr,en}/<slug>.json
//           content/{blog,guides}/alternates.json
//           public/images/{blog,guides}/<fileId>.<ext>
//           sessions/extract-report.json

import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import 'dotenv/config';

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DRY = process.argv.includes('--dry');
const SKIP_IMAGES = process.argv.includes('--skip-images');

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const BLOG_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID;
const GUIDE_ID = process.env.WEBFLOW_GUIDE_COLLECTION_ID;
if (!WEBFLOW_API_KEY || !BLOG_ID || !GUIDE_ID) {
  console.error('Missing Webflow env vars'); process.exit(1);
}

const CMS_LOCALE_ID = { fr: null, en: '672e1f1758256ef525dbc4c7' };

// --- Reference tables -------------------------------------------------------

const DRAFTS_TO_KEEP = new Set([
  'photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre',
  'photographie-2d-de-produits',
  'photographie-de-produits-a-360-degres-en-interne',
]);

const BLOG_CATEGORY_LABELS = {
  '5f78e051722c291d8cbf5ec9fea26fc5': { fr: 'Actualités', en: 'News' },
  '104a291d655dd1b3985ecb9a34c0df8a': { fr: 'E-commerce', en: 'E-commerce' },
  '21dbdefef81c6afd88ac0fb6b4a61478': { fr: 'Produits', en: 'Products' },
  'a0975835d398d479f43208215ebfea18': { fr: 'Innovations', en: 'Innovations' },
};

const AUTHOR_LABELS = {
  '1ee1af407b1304f8ec54d409bf4544ab': 'Laurent Wainberg',
};

// Legacy FR paths mapped directly to Next.js equivalents.
// Targets here are lang-neutral; the lang prefix is added by rewriteInternalPath.
const LEGACY_PATH_REWRITES = {
  '/formations-photographie-produits-packshotcreator': '/academy/formations-packshot',
  '/gestion-workflow-shotflow': '/ia-photo-produit',
  '/produits': '/studios-photo-automatises',
  '/createur-des-studios-photos-connectes': '/a-propos',
};

// Path-prefix aliases used in EN articles (Webflow kept separate namespaces).
// Applied BEFORE the whitelist match.
const EN_NAMESPACE_ALIASES = [
  ['/photo-studio/', '/studio-photo/'],
];

// /sector/<slug-EN> → /industrie/<slug-FR> (industrie collection only has FR slugs).
const SECTOR_SLUG_MAP = {
  'jewelry': 'bijoux',
  'beauty': 'beautes',
  'electronics': 'high-tech-electromenager-informatique',
  'components': 'pieces-techniques',
  'fashion': 'shootings-photo',
  'culinary': 'art-de-table-photos-culinaires',
  'furniture': 'meubles',
  'sports': 'sports',
  'glasses': 'simplifiez-production-de-vos-visuels-optique-lunetterie',
  'bottles': 'bouteilles',
  'art': 'objets-art-antiquite',
  'shoes': 'chaussures',
};

// Paths -> Directory
const DIRS = {
  contentBlog: path.join(ROOT, 'content/blog'),
  contentGuides: path.join(ROOT, 'content/guides'),
  imagesBlog: path.join(ROOT, 'public/images/blog'),
  imagesGuides: path.join(ROOT, 'public/images/guides'),
  sessions: path.join(ROOT, 'sessions'),
};

// --- Utils ------------------------------------------------------------------

async function ensureDirs() {
  for (const d of Object.values(DIRS)) await fs.mkdir(d, { recursive: true });
  for (const lang of ['fr', 'en']) {
    await fs.mkdir(path.join(DIRS.contentBlog, lang), { recursive: true });
    await fs.mkdir(path.join(DIRS.contentGuides, lang), { recursive: true });
  }
}

async function webflowFetch(collectionId, lang) {
  const params = new URLSearchParams({ limit: '100' });
  const loc = CMS_LOCALE_ID[lang];
  if (loc) params.set('cmsLocaleId', loc);
  const url = `https://api.webflow.com/v2/collections/${collectionId}/items?${params}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${WEBFLOW_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Webflow ${res.status}: ${url}`);
  const data = await res.json();
  return data.items || [];
}

async function loadCsvMapping() {
  const file = path.join(DIRS.sessions, 'fr-subdomain-mapping-v3.csv');
  const raw = await fs.readFile(file, 'utf8');
  const [header, ...lines] = raw.trim().split('\n');
  const cols = header.split(',');
  const map = new Map();
  for (const line of lines) {
    const vals = line.split(',');
    const row = Object.fromEntries(cols.map((c, i) => [c, vals[i] ?? '']));
    // Normalize path (strip trailing slash for match)
    const key = row.legacy_path.replace(/\/$/, '');
    map.set(key, { action: row.action, target: row.target });
  }
  return map;
}

// --- HTML link rewriting ----------------------------------------------------

/**
 * Decide what to do with a single href.
 * Returns either { href: newHref } (for rewrite) or { unlink: true } (to strip <a>).
 * Context gives lang + cross-lang slug indices.
 */
function decideHref(href, lang, ctx) {
  if (!href) return { href };
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { href };
  }

  let pathname = null;
  let search = '';
  let hash = '';

  if (/^https?:\/\//i.test(href)) {
    let u;
    try { u = new URL(href); } catch { return { href }; }
    const host = u.hostname.toLowerCase();
    if (host === 'www.packshot-creator.com' || host === 'packshot-creator.com') {
      pathname = u.pathname; search = u.search; hash = u.hash;
    } else if (host === 'fr.packshot-creator.com') {
      return applyFrSubdomainRule(u.pathname, lang, ctx);
    } else {
      // External host → keep
      return { href };
    }
  } else if (href.startsWith('/')) {
    const q = href.indexOf('?');
    const h = href.indexOf('#');
    const cut = [q, h].filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? -1;
    pathname = cut >= 0 ? href.slice(0, cut) : href;
    if (q >= 0) search = href.slice(q, h >= 0 ? h : undefined);
    if (h >= 0) hash = href.slice(h);
  } else {
    // relative or unknown
    return { href };
  }

  return rewriteInternalPath(pathname, search, hash, lang, ctx);
}

function applyFrSubdomainRule(pathname, lang, ctx) {
  const key = pathname.replace(/\/$/, '');
  const rule = ctx.subdomainMap.get(key) || ctx.subdomainMap.get(decodeURIComponent(key));
  if (!rule) {
    if (ctx.debug) console.log(`[fr-sub] NO-RULE ${pathname} → unlink`);
    return { unlink: true };
  }
  if (rule.action === 'unlink') return { unlink: true };
  const out = rewriteInternalPath(rule.target, '', '', lang, ctx);
  if (ctx.debug && out.unlink) {
    console.log(`[fr-sub] RULE-BUT-REWRITE-UNLINK ${pathname} → target ${rule.target} → unlink (lang=${lang})`);
  }
  return out;
}

function rewriteInternalPath(pathname, search, hash, lang, ctx) {
  // Already lang-prefixed
  if (/^\/(fr|en)(\/|$)/.test(pathname)) {
    return { href: `${pathname}${search}${hash}` };
  }

  // /sector/<slug-EN> → /industrie/<slug-FR> (before alias prefix handling)
  const sectorM = pathname.match(/^\/sector\/([a-z0-9-]+)\/?$/i);
  if (sectorM) {
    const mapped = SECTOR_SLUG_MAP[sectorM[1]];
    if (mapped) pathname = `/industrie/${mapped}`;
  }

  // Apply EN-namespace aliases (e.g. /photo-studio → /studio-photo)
  for (const [from, to] of EN_NAMESPACE_ALIASES) {
    if (pathname === from.replace(/\/$/, '') || pathname.startsWith(from)) {
      pathname = pathname.replace(from, to);
      break;
    }
  }

  // Apply legacy rewrites for specific paths
  const legacy = LEGACY_PATH_REWRITES[pathname];
  if (legacy) pathname = legacy;

  const otherLang = lang === 'fr' ? 'en' : 'fr';

  // /blog/<slug>
  const blogM = pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  if (blogM) {
    const srcSlug = blogM[1];
    const resolved = resolveCorpusSlug(srcSlug, 'blog', lang, ctx);
    if (resolved) return { href: `/${lang}/blog/${resolved}${search}${hash}` };
    // Slug not in corpus → check if it's a known dead link
    if (ctx.deadBlogSlugs.has(srcSlug)) return { unlink: true };
    // Last resort: keep generic /<lang>/blog to avoid breakage
    return { unlink: true };
  }

  // /guide/<slug>
  const guideM = pathname.match(/^\/guide\/([a-z0-9-]+)\/?$/i);
  if (guideM) {
    const srcSlug = guideM[1];
    const resolved = resolveCorpusSlug(srcSlug, 'guide', lang, ctx);
    if (resolved) return { href: `/${lang}/guide/${resolved}${search}${hash}` };
    return { unlink: true };
  }

  // /industrie/<slug> or /studio-photo/<slug> or other namespaces still valid on Next.js
  if (/^\/(industrie|studio-photo|academy|solutions|packshot-\w+|ia-photo-produit|industrie-defense|studios-photo-automatises|besoins-photographie-produit|questions-cles-photographie-produit|calculateur-roi|contact|a-propos|blog|guide|secteurs)(\/|$)/.test(pathname)) {
    return { href: `/${lang}${pathname}${search}${hash}` };
  }

  // Root-ish targets
  if (pathname === '/' || pathname === '') {
    return { href: `/${lang}${search}${hash}` };
  }

  // Unknown → unlink
  return { unlink: true };
}

/**
 * Given a slug in the lang of the source article, return the slug to use for
 * the same lang. If the slug doesn't exist in that lang but exists in the other
 * (via shared webflowItemId), fall back to it. Else return null.
 */
function resolveCorpusSlug(slug, kind, lang, ctx) {
  const bySlug = kind === 'blog' ? ctx.blog.slugToItemId : ctx.guide.slugToItemId;
  const byItemId = kind === 'blog' ? ctx.blog.itemIdToSlug : ctx.guide.itemIdToSlug;
  // Source slug may be in any lang. Find its webflowItemId from any lang index.
  const itemId = bySlug[lang][slug] || bySlug[lang === 'fr' ? 'en' : 'fr'][slug];
  if (!itemId) return null;
  // Prefer matching-lang slug; fallback to other lang only if missing
  return byItemId[lang][itemId] || byItemId[lang === 'fr' ? 'en' : 'fr'][itemId] || null;
}

/**
 * Rewrite all links inside HTML. Strips <a> tags for `unlink` decisions but
 * keeps their inner text. Also rewrites image src attributes to local paths.
 */
function rewriteHtml(html, lang, ctx) {
  if (!html) return { html, imageUrls: [], linkStats: {} };

  const imageUrls = new Set();
  const stats = { kept: 0, rewritten: 0, unlinked: 0, total: 0 };

  // 1) Collect & rewrite <img src>
  const withLocalImgs = html.replace(/<img\b([^>]*?)\bsrc="([^"]+)"([^>]*)>/gi,
    (match, before, src, after) => {
      imageUrls.add(src);
      const local = ctx.urlToLocal?.get(src);
      if (!local) return match;
      return `<img${before}src="${local}"${after}>`;
    });

  // 2) Rewrite <a href>
  let linked = withLocalImgs.replace(/<a\b([^>]*)\bhref="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
    (match, before, href, after, inner) => {
      stats.total++;
      const decision = decideHref(href, lang, ctx);
      if (decision.unlink) {
        stats.unlinked++;
        return inner; // strip <a>, keep text
      }
      if (decision.href === href) {
        stats.kept++;
        return match;
      }
      stats.rewritten++;
      return `<a${before}href="${decision.href}"${after}>${inner}</a>`;
    });

  return { html: linked, imageUrls: [...imageUrls], linkStats: stats };
}

// --- Image pipeline ---------------------------------------------------------

function fileIdFromUrl(url) {
  // Webflow CDN pattern: .../siteId/<fileId>_<fileName>.<ext>
  // fileId is the 24-char hex after the last /
  try {
    const u = new URL(url);
    const last = u.pathname.split('/').pop() || '';
    const m = last.match(/^([0-9a-f]{24})/i);
    return m ? m[1] : last.split('.')[0].slice(0, 32);
  } catch {
    return null;
  }
}

function guessExt(url) {
  try {
    const p = new URL(url).pathname.toLowerCase();
    const m = p.match(/\.([a-z0-9]+)(?:\?|$)/);
    return m ? m[1] : 'bin';
  } catch { return 'bin'; }
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

/**
 * Download one Webflow CDN URL and persist it under publicDir, returning the
 * relative web path (e.g. "/images/blog/67abc.avif").
 * Conversion rules:
 *   - GIF → MP4 (via ffmpeg)
 *   - AVIF → copy
 *   - JPEG/PNG/WebP → AVIF (via sharp)
 */
async function processImage(url, publicDir, webPrefix, cache) {
  if (cache.has(url)) return cache.get(url);
  const fileId = fileIdFromUrl(url) || `unknown-${cache.size}`;
  const ext = guessExt(url);

  let outName;
  let webPath;
  const absDir = publicDir;

  try {
    const existing = await fs.readdir(absDir).catch(() => []);
    const already = existing.find((f) => f.startsWith(fileId + '.'));
    if (already) {
      webPath = `${webPrefix}/${already}`;
      cache.set(url, webPath);
      return webPath;
    }
  } catch { /* dir may not exist yet */ }

  const buf = await downloadBuffer(url);

  if (ext === 'gif') {
    // ffmpeg: gif → mp4
    outName = `${fileId}.mp4`;
    const tmpGif = path.join(absDir, `${fileId}.gif`);
    const outMp4 = path.join(absDir, outName);
    await fs.writeFile(tmpGif, buf);
    await execFileP('ffmpeg', [
      '-y', '-i', tmpGif,
      '-movflags', 'faststart',
      '-pix_fmt', 'yuv420p',
      '-vf', "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      outMp4,
    ]);
    await fs.unlink(tmpGif).catch(() => {});
  } else if (ext === 'avif') {
    outName = `${fileId}.avif`;
    await fs.writeFile(path.join(absDir, outName), buf);
  } else {
    // jpg/jpeg/png/webp → avif
    outName = `${fileId}.avif`;
    const avif = await sharp(buf).avif({ quality: 65 }).toBuffer();
    await fs.writeFile(path.join(absDir, outName), avif);
  }

  webPath = `${webPrefix}/${outName}`;
  cache.set(url, webPath);
  return webPath;
}

// --- Field mapping ----------------------------------------------------------

function isValidSlug(s) {
  return typeof s === 'string' && /^[a-z0-9][a-z0-9-]*$/i.test(s);
}

function mapBlogItem(item, lang, ctx) {
  const f = item.fieldData || {};
  const slug = f.slug;
  if (!isValidSlug(slug)) return null;
  if (item.isArchived) return null;
  if (item.isDraft && !DRAFTS_TO_KEEP.has(slug)) return null;

  const name = f.name || '';
  const h1 = f['titre-principal-h1-et-metatitre'] || name;
  const categoryId = typeof f.categorie === 'string' ? f.categorie : null;
  const authorId = typeof f.auteur === 'string' ? f.auteur : null;

  const { html: content, imageUrls, linkStats } =
    rewriteHtml(f.contenu, lang, ctx);

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: f[`faq---question-${n}`] || '',
    answer: f[`faq---reponse-${n}`] || '',
  })).filter((q) => q.question && q.answer);

  const heroUrl = f['image-principale']?.url || null;
  const heroLocal = heroUrl ? ctx.urlToLocal?.get(heroUrl) || null : null;

  return {
    webflowItemId: item.id,
    lang,
    slug,
    title: name,
    h1,
    metaTitle: f['meta-titre'] || null,
    description: f['meta-description'] || '',
    date: f.date || item.lastPublished || item.createdOn || '',
    image: heroLocal || heroUrl,
    imageSource: heroUrl,
    category: categoryId ? BLOG_CATEGORY_LABELS[categoryId]?.[lang] || null : null,
    categoryId,
    author: authorId ? AUTHOR_LABELS[authorId] || null : null,
    readingTime: typeof f['temps-de-lecture'] === 'number' ? f['temps-de-lecture'] : null,
    content,
    faqs,
    _stats: { imageUrls: imageUrls.length, ...linkStats },
    source: 'webflow',
  };
}

function mapGuideItem(item, lang, ctx) {
  const f = item.fieldData || {};
  const slug = f.slug;
  if (!isValidSlug(slug)) return null;
  if (item.isArchived) return null;
  if (item.isDraft) return null; // no draft-to-keep list for guides

  const steps = [];
  for (let i = 1; i <= 10; i++) {
    const title = f[`titre-etape-${i}`];
    if (!title) break;
    const rawHtml = f[`texte-etape-${i}`] || '';
    const { html } = rewriteHtml(rawHtml, lang, ctx);
    const imgUrl = f[`image-etape-${i}`]?.url || null;
    const imgLocal = imgUrl ? ctx.urlToLocal?.get(imgUrl) || null : null;
    steps.push({
      position: i,
      title,
      content: html,
      image: imgLocal || imgUrl,
      imageSource: imgUrl,
      structuredText: f[`texte-etape-${i}---donnees-structurees-2`] || null,
    });
  }

  const { html: introText } = rewriteHtml(f['texte-introduction'] || '', lang, ctx);

  const faqs = [1, 2, 3, 4, 5].map((n) => ({
    question: f[`question-${n}---faq`] || '',
    answer: f[`reponse-${n}---faq`] || '',
  })).filter((q) => q.question && q.answer);

  const heroUrl = f['image-principale']?.url || null;
  const heroLocal = heroUrl ? ctx.urlToLocal?.get(heroUrl) || null : null;

  return {
    webflowItemId: item.id,
    lang,
    slug,
    title: f.name || '',
    h1: f['titre-principal'] || f.name || '',
    metaTitle: f['meta-titre'] || null,
    description: f['meta-description'] || '',
    date: item.lastPublished || item.createdOn || '',
    image: heroLocal || heroUrl,
    imageSource: heroUrl,
    categoryId: typeof f['categorie-3'] === 'string' ? f['categorie-3'] : null,
    duration: f['champ-duree'] || null,
    tool: f['champ-outil'] || null,
    logistics: f['champ-logistique'] || null,
    introText,
    introMedia: f['premiere-image-video'] || null,
    steps,
    faqs,
    source: 'webflow',
  };
}

// --- Image collection helpers -----------------------------------------------

function collectBlogImageUrls(item, urls) {
  const f = item.fieldData || {};
  if (f['image-principale']?.url) urls.add(f['image-principale'].url);
  const html = f.contenu || '';
  const re = /<img\b[^>]*\bsrc="([^"]+)"/gi;
  let m;
  while ((m = re.exec(html))) urls.add(m[1]);
}

function collectGuideImageUrls(item, urls) {
  const f = item.fieldData || {};
  if (f['image-principale']?.url) urls.add(f['image-principale'].url);
  for (let i = 1; i <= 10; i++) {
    const img = f[`image-etape-${i}`]?.url;
    if (img) urls.add(img);
    const html = f[`texte-etape-${i}`] || '';
    const re = /<img\b[^>]*\bsrc="([^"]+)"/gi;
    let m;
    while ((m = re.exec(html))) urls.add(m[1]);
  }
  const intro = f['texte-introduction'] || '';
  const re2 = /<img\b[^>]*\bsrc="([^"]+)"/gi;
  let m2;
  while ((m2 = re2.exec(intro))) urls.add(m2[1]);
}

// --- Main -------------------------------------------------------------------

async function main() {
  console.log(`[extract] dry=${DRY} skip-images=${SKIP_IMAGES}`);
  await ensureDirs();

  const subdomainMap = await loadCsvMapping();
  console.log(`[mapping] ${subdomainMap.size} fr-subdomain rules loaded`);

  // Fetch
  console.log('[fetch] blog FR...');
  const rawBlogFr = await webflowFetch(BLOG_ID, 'fr');
  console.log('[fetch] blog EN...');
  const rawBlogEn = await webflowFetch(BLOG_ID, 'en');
  console.log('[fetch] guides FR...');
  const rawGuideFr = await webflowFetch(GUIDE_ID, 'fr');
  console.log('[fetch] guides EN...');
  const rawGuideEn = await webflowFetch(GUIDE_ID, 'en');

  const filterBlog = (items) =>
    items.filter((i) => {
      const s = i?.fieldData?.slug;
      if (!isValidSlug(s)) return false;
      if (i.isArchived) return false;
      if (i.isDraft && !DRAFTS_TO_KEEP.has(s)) return false;
      return true;
    });

  const filterGuide = (items) =>
    items.filter((i) => {
      const s = i?.fieldData?.slug;
      return isValidSlug(s) && !i.isArchived && !i.isDraft;
    });

  const blog = { fr: filterBlog(rawBlogFr), en: filterBlog(rawBlogEn) };
  const guide = { fr: filterGuide(rawGuideFr), en: filterGuide(rawGuideEn) };
  console.log(`[counts] blog fr=${blog.fr.length} en=${blog.en.length} | guide fr=${guide.fr.length} en=${guide.en.length}`);

  // Build cross-lang indices for blog and guides
  const indices = {};
  for (const kind of ['blog', 'guide']) {
    const src = kind === 'blog' ? blog : guide;
    const slugToItemId = { fr: {}, en: {} };
    const itemIdToSlug = { fr: {}, en: {} };
    for (const lang of ['fr', 'en']) {
      for (const item of src[lang]) {
        const s = item.fieldData.slug;
        slugToItemId[lang][s] = item.id;
        itemIdToSlug[lang][item.id] = s;
      }
    }
    indices[kind] = { slugToItemId, itemIdToSlug };
  }

  // Dead blog slugs = those referenced by /blog/<slug> links that don't match any corpus slug
  // (Populated later when we scan links; but for now keep an empty set; we'll rely on resolveCorpusSlug returning null.)
  const deadBlogSlugs = new Set();

  // Collect all image URLs across both kinds+langs
  const imageUrls = new Set();
  for (const lang of ['fr', 'en']) {
    for (const it of blog[lang]) collectBlogImageUrls(it, imageUrls);
    for (const it of guide[lang]) collectGuideImageUrls(it, imageUrls);
  }
  console.log(`[images] ${imageUrls.size} unique URLs to process`);

  // Download + convert, build url→local map
  const urlToLocal = new Map();
  if (!SKIP_IMAGES && !DRY) {
    const all = [...imageUrls];
    let done = 0, failed = 0;
    // Split by kind heuristically: an URL used in blog goes to blog dir, same for guides.
    // Simpler: bucket by first usage. We track per-URL kind.
    const urlKind = new Map();
    for (const it of blog.fr.concat(blog.en)) {
      const urls = new Set();
      collectBlogImageUrls(it, urls);
      for (const u of urls) if (!urlKind.has(u)) urlKind.set(u, 'blog');
    }
    for (const it of guide.fr.concat(guide.en)) {
      const urls = new Set();
      collectGuideImageUrls(it, urls);
      for (const u of urls) if (!urlKind.has(u)) urlKind.set(u, 'guide');
    }
    const CONCURRENCY = 6;
    const queue = [...all];
    async function worker() {
      while (queue.length) {
        const url = queue.shift();
        const kind = urlKind.get(url) || 'blog';
        const dir = kind === 'blog' ? DIRS.imagesBlog : DIRS.imagesGuides;
        const prefix = `/images/${kind}`;
        try {
          await processImage(url, dir, prefix, urlToLocal);
          done++;
          if (done % 20 === 0) console.log(`[images] ${done}/${all.length}`);
        } catch (e) {
          failed++;
          console.warn(`[images] FAIL ${url}: ${e.message}`);
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    console.log(`[images] done=${done} failed=${failed}`);
  } else {
    console.log('[images] SKIPPED');
  }

  const ctx = {
    subdomainMap,
    deadBlogSlugs,
    urlToLocal,
    blog: indices.blog,
    guide: indices.guide,
    debug: process.argv.includes('--debug'),
  };

  // Map items → JSON
  const report = { blog: {}, guide: {} };

  for (const lang of ['fr', 'en']) {
    const outDir = path.join(DIRS.contentBlog, lang);
    const arr = [];
    for (const item of blog[lang]) {
      const mapped = mapBlogItem(item, lang, ctx);
      if (!mapped) continue;
      arr.push(mapped);
      if (!DRY) {
        await fs.writeFile(
          path.join(outDir, `${mapped.slug}.json`),
          JSON.stringify(mapped, null, 2),
        );
      }
    }
    report.blog[lang] = arr.length;
    console.log(`[write] blog/${lang}: ${arr.length} articles`);
  }

  for (const lang of ['fr', 'en']) {
    const outDir = path.join(DIRS.contentGuides, lang);
    const arr = [];
    for (const item of guide[lang]) {
      const mapped = mapGuideItem(item, lang, ctx);
      if (!mapped) continue;
      arr.push(mapped);
      if (!DRY) {
        await fs.writeFile(
          path.join(outDir, `${mapped.slug}.json`),
          JSON.stringify(mapped, null, 2),
        );
      }
    }
    report.guide[lang] = arr.length;
    console.log(`[write] guides/${lang}: ${arr.length} guides`);
  }

  // Alternates indices
  const blogAlternates = {};
  for (const id of new Set([...Object.values(indices.blog.slugToItemId.fr), ...Object.values(indices.blog.slugToItemId.en)])) {
    blogAlternates[id] = {
      fr: indices.blog.itemIdToSlug.fr[id] || null,
      en: indices.blog.itemIdToSlug.en[id] || null,
    };
  }
  const guideAlternates = {};
  for (const id of new Set([...Object.values(indices.guide.slugToItemId.fr), ...Object.values(indices.guide.slugToItemId.en)])) {
    guideAlternates[id] = {
      fr: indices.guide.itemIdToSlug.fr[id] || null,
      en: indices.guide.itemIdToSlug.en[id] || null,
    };
  }
  if (!DRY) {
    await fs.writeFile(path.join(DIRS.contentBlog, 'alternates.json'), JSON.stringify(blogAlternates, null, 2));
    await fs.writeFile(path.join(DIRS.contentGuides, 'alternates.json'), JSON.stringify(guideAlternates, null, 2));
  }

  // Final report
  const finalReport = {
    ranAt: new Date().toISOString(),
    dry: DRY,
    skipImages: SKIP_IMAGES,
    counts: {
      blog: { fr: blog.fr.length, en: blog.en.length },
      guide: { fr: guide.fr.length, en: guide.en.length },
      images: imageUrls.size,
      imagesDownloaded: urlToLocal.size,
    },
    alternates: {
      blog: Object.keys(blogAlternates).length,
      guide: Object.keys(guideAlternates).length,
    },
  };
  if (!DRY) {
    await fs.writeFile(
      path.join(DIRS.sessions, 'extract-report.json'),
      JSON.stringify(finalReport, null, 2),
    );
  }
  console.log('[done]', JSON.stringify(finalReport, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

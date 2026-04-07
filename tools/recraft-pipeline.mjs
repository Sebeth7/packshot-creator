#!/usr/bin/env node

/**
 * Recraft.ai Image Generation Pipeline
 *
 * Generates images from manifest, converts to AVIF via Sharp,
 * creates responsive variants for hero images.
 *
 * Usage:
 *   node tools/recraft-pipeline.mjs                    # Generate all pending images
 *   node tools/recraft-pipeline.mjs --id hero-landing-bijoux  # Generate one specific image
 *   node tools/recraft-pipeline.mjs --category secteurs       # Generate one category
 *   node tools/recraft-pipeline.mjs --priority HAUTE          # Generate by priority
 *   node tools/recraft-pipeline.mjs --dry-run                 # Preview without generating
 *   node tools/recraft-pipeline.mjs --list                    # List all images and their status
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');
const MANIFEST_PATH = path.join(__dirname, 'image-manifest.json');
const LOG_PATH = path.join(__dirname, 'recraft-pipeline.log');

// ─── Config ────────────────────────────────────────────────────────────────

const RECRAFT_API_BASE = 'https://external.api.recraft.ai/v1';
const RECRAFT_API_KEY = process.env.RECRAFT_API_KEY;

const AVIF_QUALITY_HERO = 70;
const AVIF_QUALITY_ILLUSTRATION = 80;
const AVIF_EFFORT = 6;

const RESPONSIVE_BREAKPOINTS = {
  xl: { suffix: '-xl' },   // same as base
  lg: { suffix: '-lg', scale: 1024 / 1344 },
  md: { suffix: '-md', scale: 768 / 1344 },
  sm: { suffix: '-sm', scale: 640 / 1344 },
};

const RATE_LIMIT_MS = 1500; // 1.5s between API calls

// Size mapping per model
const SIZE_MAP = {
  'recraftv4_pro': {
    '1344x768': '2688x1536',
    '1024x768': '2048x2048',
    '1024x600': '2688x1536',
  },
  'recraftv3': {
    '1344x768': '1820x1024',   // closest V3 16:9-ish
    '1024x768': '1365x1024',   // V3 native 4:3
    '1024x600': '1820x1024',   // resize after
  },
};

// Model override per image type (hero uses V3, illustrations use V4 Pro)
function getModelForImage(image) {
  if (image.type === 'hero-fullwidth') return 'recraftv3';
  return 'recraftv4_pro';
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function log(msg) {
  const timestamp = new Date().toISOString().slice(0, 19);
  const line = `[${timestamp}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_PATH, line + '\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseSize(sizeStr) {
  const [w, h] = sizeStr.split('x').map(Number);
  return { width: w, height: h };
}

function getOutputPath(image, suffix = '') {
  return path.join(IMAGES_DIR, image.outputDir, `${image.outputName}${suffix}.avif`);
}

function imageExists(image) {
  return fs.existsSync(getOutputPath(image));
}

// ─── Recraft API ───────────────────────────────────────────────────────────

async function generateImage(image) {
  const model = getModelForImage(image);
  const sizeMap = SIZE_MAP[model] || SIZE_MAP['recraftv4_pro'];
  const genSize = sizeMap[image.size] || '1344x768';

  const body = {
    prompt: image.prompt,
    model,
    size: genSize,
    n: 1,
    response_format: 'url',
  };

  // V3 style
  if (model === 'recraftv3') {
    body.style = 'realistic_image';
  }

  const response = await fetch(`${RECRAFT_API_BASE}/images/generations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RECRAFT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Recraft API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  if (!data.data || !data.data[0] || !data.data[0].url) {
    throw new Error(`Unexpected API response: ${JSON.stringify(data)}`);
  }

  return data.data[0].url;
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

// ─── Sharp Processing ──────────────────────────────────────────────────────

async function convertToAvif(pngBuffer, outputPath, quality) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(pngBuffer)
    .avif({ quality, effort: AVIF_EFFORT })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  return Math.round(stats.size / 1024);
}

async function createResponsiveVariants(pngBuffer, image) {
  const { width, height } = parseSize(image.size);
  const results = [];

  // Base image (same as xl)
  const basePath = getOutputPath(image);
  const baseSize = await convertToAvif(pngBuffer, basePath, AVIF_QUALITY_HERO);
  results.push({ path: basePath, size: `${baseSize} KB` });

  // XL variant (same dimensions as base)
  const xlPath = getOutputPath(image, '-xl');
  fs.copyFileSync(basePath, xlPath);
  results.push({ path: xlPath, size: `${baseSize} KB (copy)` });

  // LG, MD, SM variants
  for (const [key, bp] of Object.entries(RESPONSIVE_BREAKPOINTS)) {
    if (key === 'xl') continue;

    const newWidth = Math.round(width * bp.scale);
    const newHeight = Math.round(height * bp.scale);
    const variantPath = getOutputPath(image, bp.suffix);

    const resizedBuffer = await sharp(pngBuffer)
      .resize(newWidth, newHeight, { fit: 'fill' })
      .png()
      .toBuffer();

    const variantSize = await convertToAvif(resizedBuffer, variantPath, AVIF_QUALITY_HERO);
    results.push({ path: variantPath, size: `${variantSize} KB`, dimensions: `${newWidth}x${newHeight}` });
  }

  return results;
}

// ─── Pipeline ──────────────────────────────────────────────────────────────

async function processImage(image, options = {}) {
  const exists = imageExists(image);

  if (exists && !options.force) {
    log(`⏭  SKIP ${image.id} — already exists`);
    return { status: 'skipped', id: image.id };
  }

  if (options.dryRun) {
    log(`🔍 DRY-RUN ${image.id} — ${image.size} — ${image.prompt.slice(0, 80)}...`);
    return { status: 'dry-run', id: image.id };
  }

  log(`🎨 GENERATING ${image.id} (${image.size})...`);

  try {
    // 1. Generate with Recraft
    const imageUrl = await generateImage(image);
    log(`   ✓ Generated: ${imageUrl.slice(0, 80)}...`);

    // 2. Download PNG
    let pngBuffer = await downloadImage(imageUrl);
    log(`   ✓ Downloaded: ${Math.round(pngBuffer.length / 1024)} KB PNG`);

    // 2b. Resize to target if generation size differs
    const model = getModelForImage(image);
    const sizeMap = SIZE_MAP[model] || SIZE_MAP['recraftv4_pro'];
    const targetSize = parseSize(image.size);
    const genSize = sizeMap[image.size] || image.size;
    const genParsed = parseSize(genSize);
    if (genParsed.width !== targetSize.width || genParsed.height !== targetSize.height) {
      pngBuffer = await sharp(pngBuffer)
        .resize(targetSize.width, targetSize.height, { fit: 'cover' })
        .png()
        .toBuffer();
      log(`   ✓ Resized: ${genSize} → ${image.size}`);
    }

    // 3. Convert to AVIF + responsive variants
    if (image.responsiveVariants) {
      const variants = await createResponsiveVariants(pngBuffer, image);
      for (const v of variants) {
        log(`   ✓ ${path.basename(v.path)} — ${v.size}${v.dimensions ? ` (${v.dimensions})` : ''}`);
      }
    } else {
      const quality = image.type === 'hero-fullwidth' ? AVIF_QUALITY_HERO : AVIF_QUALITY_ILLUSTRATION;
      const outputPath = getOutputPath(image);
      const fileSize = await convertToAvif(pngBuffer, outputPath, quality);
      log(`   ✓ ${path.basename(outputPath)} — ${fileSize} KB`);
    }

    log(`   ✅ DONE ${image.id}`);
    return { status: 'success', id: image.id };

  } catch (error) {
    log(`   ❌ FAILED ${image.id}: ${error.message}`);
    return { status: 'error', id: image.id, error: error.message };
  }
}

async function runPipeline(options = {}) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  let images = manifest.images;

  // Filters
  if (options.id) {
    images = images.filter(img => img.id === options.id);
    if (images.length === 0) {
      console.error(`No image found with id: ${options.id}`);
      process.exit(1);
    }
  }
  if (options.category) {
    images = images.filter(img => img.category === options.category);
  }
  if (options.priority) {
    images = images.filter(img => img.priority === options.priority);
  }

  // List mode
  if (options.list) {
    console.log('\n📋 IMAGE MANIFEST STATUS\n');
    console.log('ID'.padEnd(40) + 'Priority'.padEnd(10) + 'Size'.padEnd(12) + 'Status');
    console.log('─'.repeat(80));
    for (const img of images) {
      const exists = imageExists(img);
      const status = exists ? '✅ exists' : '⏳ pending';
      console.log(
        img.id.padEnd(40) +
        img.priority.padEnd(10) +
        img.size.padEnd(12) +
        status
      );
    }
    const pending = images.filter(img => !imageExists(img)).length;
    const existing = images.filter(img => imageExists(img)).length;
    console.log(`\nTotal: ${images.length} | Existing: ${existing} | Pending: ${pending}`);
    return;
  }

  // Check API key
  if (!options.dryRun && !RECRAFT_API_KEY) {
    console.error('❌ RECRAFT_API_KEY environment variable is required.');
    console.error('   Set it with: export RECRAFT_API_KEY=your_key_here');
    process.exit(1);
  }

  log(`\n${'='.repeat(60)}`);
  log(`RECRAFT PIPELINE — ${images.length} images to process`);
  log(`Mode: ${options.dryRun ? 'DRY-RUN' : 'GENERATE'}`);
  log(`${'='.repeat(60)}\n`);

  const results = { success: 0, skipped: 0, error: 0, dryRun: 0 };

  for (let i = 0; i < images.length; i++) {
    const result = await processImage(images[i], options);
    results[result.status === 'dry-run' ? 'dryRun' : result.status]++;

    // Rate limiting between API calls
    if (!options.dryRun && result.status === 'success' && i < images.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  log(`\n${'─'.repeat(60)}`);
  log(`RESULTS: ${results.success} generated, ${results.skipped} skipped, ${results.error} errors, ${results.dryRun} dry-run`);

  if (results.success > 0) {
    const cost = results.success * 0.04;
    log(`COST: ~$${cost.toFixed(2)} (${results.success} × $0.04)`);
  }

  log(`${'─'.repeat(60)}\n`);
}

// ─── CLI ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const options = {
  dryRun: args.includes('--dry-run'),
  list: args.includes('--list'),
  force: args.includes('--force'),
  id: args.includes('--id') ? args[args.indexOf('--id') + 1] : null,
  category: args.includes('--category') ? args[args.indexOf('--category') + 1] : null,
  priority: args.includes('--priority') ? args[args.indexOf('--priority') + 1] : null,
};

runPipeline(options).catch(err => {
  console.error('Pipeline crashed:', err);
  process.exit(1);
});

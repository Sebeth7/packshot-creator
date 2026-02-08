import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  product: 'Produit',
  page: 'Page',
  formation: 'Formation',
};

const typeIcons: Record<string, string> = {
  blog: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2',
  product: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a5 5 0 100-10 5 5 0 000 10z',
  page: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  formation: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5',
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'PackshotCreator';
  const type = searchParams.get('type') || 'page';
  const lang = searchParams.get('lang') || 'fr';

  const label = typeLabels[type] || typeLabels.page;
  const iconPath = typeIcons[type] || typeIcons.page;
  const domain = lang === 'en' ? 'packshot-creator.com/en' : 'packshot-creator.com';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          background: 'linear-gradient(135deg, #2a2e45 0%, #4c5578 50%, #6667AB 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Logo text fallback (SVG can't be used in og) */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700,
                color: 'white',
              }}
            >
              P
            </div>
            <span
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              PackshotCreator
            </span>
          </div>

          {/* Type badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(102, 103, 171, 0.6)',
              borderRadius: '24px',
              padding: '8px 20px',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={iconPath} />
            </svg>
            <span
              style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Center: Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: title.length > 60 ? '42px' : title.length > 35 ? '52px' : '60px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            {domain}
          </span>
          <div
            style={{
              width: '60px',
              height: '3px',
              borderRadius: '2px',
              background: 'rgba(102, 103, 171, 0.8)',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

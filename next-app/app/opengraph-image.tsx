import { ImageResponse } from 'next/server';

export const runtime = 'edge';

// Route: /opengraph-image
export default function Image() {
  const width = 1200;
  const height = 630;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0a0a0a 100%)',
        }}
      >
        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(31, 111, 235, 0.35)',
            background: 'rgba(15, 23, 42, 0.55)',
            padding: '40px 56px',
            maxWidth: 980,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#e6edf3',
              fontFamily: 'Inter, Segoe UI, Roboto, system-ui, sans-serif',
            }}
          >
            David Ortiz — Developer Portfolio
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 28,
              fontWeight: 500,
              color: '#9ba3af',
              fontFamily: 'Inter, Segoe UI, Roboto, system-ui, sans-serif',
            }}
          >
            Next.js App Router • TypeScript • Tailwind CSS
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}

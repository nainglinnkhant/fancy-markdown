/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#fff',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            paddingTop: '150px',
          }}
        >
          <svg width='200' viewBox='0 0 75 65' fill='#000' style={{ margin: '0 75px' }}>
            <path d='M37.59.25l36.95 64H.64l36.95-64z'></path>
          </svg>
          <div
            style={{
              fontSize: 45,
              letterSpacing: '0.1em',
              color: '#000',
              marginTop: 50,
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              textTransform: 'uppercase',
            }}
          >
            Fancy Markdown
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

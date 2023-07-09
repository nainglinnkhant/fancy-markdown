import { Analytics } from '@vercel/analytics/react'

import { Providers } from './providers'
import './globals.css'

const TITLE = 'Fancy Markdown'
const DESCRIPTION =
  'A fancy markdown textarea which supports twitter mention and hover card features.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og'],
    creator: '@nainglk',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og'],
    siteName: TITLE,
    url: 'https://fancy-markdown.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>

        <Analytics />
      </body>
    </html>
  )
}

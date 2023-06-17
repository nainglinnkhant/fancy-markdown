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
    images: [`/og`],
    title: TITLE,
    description: DESCRIPTION,
  },
  openGraph: {
    type: 'website',
    images: [`/og`],
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

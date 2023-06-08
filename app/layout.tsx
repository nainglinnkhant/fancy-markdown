import { Providers } from '@/components/theme/Providers'
import './globals.css'

export const metadata = {
  title: 'Fancy Markdown',
  description:
    'A fancy markdown textarea which supports twitter mention and hover card features.',
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

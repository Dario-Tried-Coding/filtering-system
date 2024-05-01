import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Filtering System | Dario Tried Coding',
  description: 'Sistema di filtraggio per la ricerca di prodotti realizzato con Next.js e TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='it'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

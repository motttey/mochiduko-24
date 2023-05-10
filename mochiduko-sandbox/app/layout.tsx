import Header from './api/mochiduko/Header'
import './globals.css'
import { Inter, Noto_Sans_JP } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: 'Mochiduko 2024',
  description: 'モチヅ庫\'24',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${NotoSansJP.className} ${inter.className}`}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
}

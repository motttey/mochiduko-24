import Header from './api/mochiduko/Header'
import './globals.css'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: 'モチヅ庫\'24',
  description: 'モチヅ庫\'24',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta
          name="description"
          content={metadata.description}
          key="desc"
        />
      </Head>
      <body className={`${NotoSansJP.className} ${inter.className}`}>
        <Header></Header>
        {children}
        <Header></Header>
      </body>
    </html>
  )
}

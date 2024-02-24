import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

import { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  // https://github.com/vercel/next.js/pull/44594
  variable: '--font-noto-sans-jp',
  preload: true,
  display: 'swap',
});

export interface MetaTag {
  name: string,
  content: string
}

const title = 'モチヅ庫\'24';
const description = '望月 田吾作 (もちづき たごさく)が描いた、ドラえもんや藤子不二雄作品などのイラストや漫画を掲載しているサイトです.';
const url = 'http://motttey.github.io/mochiduko-20';
const imgUrl = 'https://motttey.github.io/mochiduko-20/drawer-bg.webp'
export const metadata: Metadata  = {
  title,
  description,
  icons: "/favicon.ico",
  keywords: [
    "望月",
    "望月田吾作",
    "Tagosaku Mochiduki",
    "ドラえもん",
    "Doraemon",
    "Fujiko Fujio",
    "藤子不二雄",
    "藤子・F・不二雄",
    "イラスト",
    "ドラえもん イラスト"
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
    images: {
      url: imgUrl
    },
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@mt_tg',
    creator: '@mt_tg',
    images: [imgUrl]
  },
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${NotoSansJP.className}`}>
      <body>
        <MantineProvider>
          <Header></Header>
          {children}
          <Footer></Footer>
        </MantineProvider>
      </body>
    </html>
  )
}

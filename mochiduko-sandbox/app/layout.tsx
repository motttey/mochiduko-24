import './globals.css';
import { Inter, Noto_Sans_JP } from '@next/font/google';

import Header from '../components/Header';
import 'semantic-ui-css/semantic.min.css'
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  // https://github.com/vercel/next.js/pull/44594
  preload: false,
});

export interface MetaTag {
  name: string,
  content: string
};

const title = 'モチヅ庫\'24';
const description = '望月 田吾作 (もちづき たごさく)が描いた、ドラえもんや藤子不二雄作品などのイラストや漫画を掲載しているサイトです.';
const url = 'http://motttey.github.io/mochiduko-20';
const imgUrl = 'https://motttey.github.io/mochiduko-20/drawer-bg.webp'
export const metadata: Metadata  = {
  title,
  description,
  icons: "/favicon.ico",
  keywords: ["望月","望月田吾作","ドラえもん","Doraemon","Fujiko Fujio","藤子不二雄","藤子・F・不二雄","イラスト","ドラえもん イラスト"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${NotoSansJP.className} ${inter.className}`}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
};

import './globals.css';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import Head from 'next/head';

import Header from './api/mochiduko/Header';


const inter = Inter({ subsets: ['latin'] });

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export interface MetaTag {
  name: string,
  content: string
};

const title = 'モチヅ庫\'24';
const description = '望月 田吾作 (もちづき たごさく)が描いた、ドラえもんや藤子不二雄作品などのイラストや漫画を掲載しているサイトです.';
const url = 'http://motttey.github.io/mochiduko-20';
export const metadata: any = {
  title,
  description,
  keywords: '望月,望月田吾作,ドラえもん,Doraemon,Fujiko Fujio,藤子不二雄,藤子・F・不二雄,イラスト,ドラえもん イラスト',
  author: 'Tagosaku Mochiduki',
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@mt_tg',
    creator: '@mt_tg',
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Head>
        <title>{metadata.title}</title>
        <meta charSet="utf-8"/>
      </Head>
      <body className={`${NotoSansJP.className} ${inter.className}`}>
        <Header></Header>
        {children}
        <Header></Header>
      </body>
    </html>
  )
};

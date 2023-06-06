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

export const metadata: any = {
  title: 'モチヅ庫\'24',
  description: '望月 田吾作 (もちづき たごさく)が描いた、ドラえもんや藤子不二雄作品などのイラストや漫画を掲載しているサイトです.',
  keywords: '望月,望月田吾作,ドラえもん,Doraemon,Fujiko Fujio,藤子不二雄,藤子・F・不二雄,イラスト,ドラえもん イラスト',
  author: 'Tagosaku Mochiduki',
  og_site_name: 'モチヅ庫\'24',
  og_type: 'website',
  og_url: 'http://motttey.github.io/mochiduko-20',
  og_image: 'https://motttey.github.io/mochiduko-20/drawer-bg.webp',
  twitter_card: 'summary_large_image',
  twitter_site: '@mt_tg'
};

export const metaTag: Array<MetaTag> = [
  {
    name: "description",
    content: metadata.description
  },
  {
    name: "keywords",
    content: metadata.keywords
  },
  {
    name: "og:site_name",
    content: metadata.og_site_name
  },
  {
    name: "og:type",
    content: metadata.og_type
  },
  {
    name: "og:url",
    content: metadata.og_url
  },
  {
    name: "og:image",
    content: metadata.og_image
  },
  {
    name: "twitter:card",
    content: metadata.twitter_card
  },
  {
    name: "twitter:site",
    content: metadata.twitter_site
  },
  {
    name: "og:image",
    content: metadata.og_image
  },
  {
    name: "twitter:title",
    content: metadata.title
  },
  {
    name: "twitter:description",
    content: metadata.description
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta charSet="utf-8"/>
        {metaTag.map((m, index) => {
          return (
            <meta
              property={m.name}
              content={m.content}
              key={index}
            />
          )
        })}
      </Head>
      <body className={`${NotoSansJP.className} ${inter.className}`}>
        <Header></Header>
        {children}
        <Header></Header>
      </body>
    </html>
  )
};

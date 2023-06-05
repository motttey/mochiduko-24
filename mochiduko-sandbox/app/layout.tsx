import './globals.css'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import Head from 'next/head';


import Header from './api/mochiduko/Header'


const inter = Inter({ subsets: ['latin'] })

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
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
        <meta charSet="utf-8"/>
        <meta
          name="description"
          content={metadata.description}
          key="desc"
        />
        <meta
          name="keywords"
          content={metadata.keywords}
          key="keywords"
        />
        <meta
          name="og:site_name"
          content={metadata.og_site_name}
          key="og:site_name"
        />
        <meta
          name="og:type"
          content={metadata.og_type}
          key="og:type"
        />
        <meta
          name="og:type"
          content={metadata.og_type}
          key="og:type"
        />
        <meta
          name="og:url"
          content={metadata.og_url}
          key="og:url"
        />
        <meta
          name="og:image"
          content={metadata.og_image}
          key="og:image"
        />
        <meta
          name="twitter:card"
          content={metadata.twitter_card}
          key="twitter:card"
        />
        <meta
          name="twitter:site"
          content={metadata.twitter_site}
          key="twitter:site"
        />
        <meta
          name="twitter:title"
          content={metadata.title}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={metadata.description}
          key="twitter:description"
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

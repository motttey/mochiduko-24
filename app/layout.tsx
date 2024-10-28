import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
// https://ospaarmann.medium.com/google-analytics-4-ga4-in-next-js-14-and-react-with-event-tracking-2ceabb00c59a
// Use google analytics with next.js
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  // https://github.com/vercel/next.js/pull/44594
  variable: "--font-noto-sans-jp",
  preload: true,
  display: "swap",
});

export interface MetaTag {
  name: string;
  content: string;
}

const title = "モチヅ庫'24";
const description =
  "望月 田吾作 (もちづき たごさく)が描いた、ドラえもんや藤子不二雄作品などのイラストや漫画を掲載しているサイトです.";

const mochidukoUrl = "https://motttey.github.io";
const imgUrl = `${mochidukoUrl}/dora2024.webp`;
export const metadata: Metadata = {
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
    "ドラえもん イラスト",
  ],
  openGraph: {
    title,
    description,
    url: mochidukoUrl,
    siteName: title,
    locale: "ja_JP",
    type: "website",
    images: {
      url: imgUrl,
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@mt_tg",
    creator: "@mt_tg",
    images: [imgUrl],
  },
  alternates: {
    canonical: mochidukoUrl,
  },
  metadataBase: new URL(process.env.URL ?? mochidukoUrl),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      <GoogleAnalytics gaId="G-Q7PCEF8R0K" />
    </html>
  );
}

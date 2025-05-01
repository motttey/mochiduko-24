import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "モチヅ庫'24",
    short_name: "モチヅ庫",
    description:
      "ハイパードラえもんクリエイターの望月 田吾作 (もちづき たごさく)が描いた、ドラえもんおよび藤子不二雄作品などのイラストや漫画を掲載しているサイトです.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

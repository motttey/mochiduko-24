import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 全てのクローラ（Googlebot以外含む）に対して特定階層を許可
        userAgent: "*",
        allow: ["/", "/dialy"],
      },
      {
        // Googlebotに対して全てのパスを許可
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: ["/", "/dialy"],
      },
    ],
    sitemap: "https://motttey.github.io/sitemap.xml",
  };
}

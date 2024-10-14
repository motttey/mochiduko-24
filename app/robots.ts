import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        disallow: ["/", "/dialy"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/dialy"],
      },
    ],
    sitemap: "https://motttey.github.io/sitemap.xml",
  };
}

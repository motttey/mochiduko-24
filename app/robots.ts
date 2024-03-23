import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
      },
    ],
    sitemap: "https://motttey.github.io/mochiduko-24/sitemap.xml",
  };
}

import { MetadataRoute } from "next";

import { mochidukoUrl } from "./data/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 全てのクローラ（Googlebot以外含む）に対して特定階層を許可
        userAgent: "*",
        allow: "/",
      },
      {
        // Googlebotに対して全てのパスを許可
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: ["/", "/dialy", "/memo"],
      },
    ],
    sitemap: `${mochidukoUrl}/sitemap.xml`,
  };
}

import { MetadataRoute } from "next";

import { mochidukoUrl } from "./data/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPostUrls: MetadataRoute.Sitemap = [];
  const startDate = new Date(2024, 4, 1);
  const endDate = new Date(2025, 6, 1);

  // ブログの開始/終了時刻からsitemapを作成
  for (
    let year = startDate.getFullYear();
    year <= endDate.getFullYear();
    year++
  ) {
    const monthStart =
      year === startDate.getFullYear() ? startDate.getMonth() + 1 : 1;
    const monthEnd =
      year === endDate.getFullYear() ? endDate.getMonth() + 1 : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      const formattedMonth = month.toString().padStart(2, "0");
      const lastModified = new Date(year, month - 1, 30);

      blogPostUrls.push({
        url: `${mochidukoUrl}/dialy/posts/${year}-${formattedMonth}`,
        lastModified: lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.3,
      });
    }
  }

  // siteMapUrls と blogPostUrls を結合して返す
  const siteMapUrls: MetadataRoute.Sitemap = [
    {
      url: mochidukoUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${mochidukoUrl}/dialy`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${mochidukoUrl}/mochiduko-24`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${mochidukoUrl}/c101`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${mochidukoUrl}/dialy/memo/dora-esekai-monogatari`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...siteMapUrls, ...blogPostUrls];
}

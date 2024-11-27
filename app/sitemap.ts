import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPostUrls: MetadataRoute.Sitemap = [];
  const startDate = new Date(2024, 3, 1);
  const endDate = new Date(2024, 10, 1);

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
        url: `https://motttey.github.io/dialy/posts/${year}-${formattedMonth}`,
        lastModified: lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      });
    }
  }

  // siteMapUrls と blogPostUrls を結合して返す
  const siteMapUrls: MetadataRoute.Sitemap = [
    {
      url: "https://motttey.github.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://motttey.github.io/dialy",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://motttey.github.io/mochiduko-24",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://motttey.github.io/mochiduko-20",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://motttey.github.io/c101",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...siteMapUrls, ...blogPostUrls];
}

// mjsだと動かないらしい
// https://github.com/actions/upload-pages-artifact/issues/74

/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "embed.pixiv.net",
        pathname: "**",
      },
    ],
    // キャッシュ期間を伸ばす
    minimumCacheTTL: 14400,
  },
  // デプロイ先が /mochiduko-24などになる場合はprefixPathをいじる
  assetPrefix: "",
  basePath: "",
};

const nextConfigWithBundleVisualizer = withBundleAnalyzer(nextConfig);

module.exports = nextConfigWithBundleVisualizer;

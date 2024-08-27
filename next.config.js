// mjsだと動かないらしい
// https://github.com/actions/upload-pages-artifact/issues/74

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  output: "export",
  images: {
    domains: ["embed.pixiv.net"],
  },
  // デプロイ先が /mochiduko-24などになる場合はprefixPathをいじる
  assetPrefix: "",
  basePath: "",
});

module.exports = nextConfig;

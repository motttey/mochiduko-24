/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["embed.pixiv.net"],
  },
  // デプロイ先が /mochiduko-24などになる場合はprefixPathをいじる
  assetPrefix: "",
  basePath: "",
};

export default nextConfig;

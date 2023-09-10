/** @type {import('next').NextConfig} */
const repositoryName = process.env.REPOSITORY_NAME ? "/" + process.env.REPOSITORY_NAME : "";

const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
    serverActions: true,
  },
  /*
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  */
  images: {
    domains: ['embed.pixiv.net'],
  },
  assetPrefix: repositoryName,
  basePath: repositoryName,
}

module.exports = nextConfig

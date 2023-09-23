/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const prefixPath = isProd ? '/next13-app-sandbox' : ''

const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
    // serverActions: true,
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
  assetPrefix: prefixPath,
  basePath: prefixPath,
}

module.exports = nextConfig

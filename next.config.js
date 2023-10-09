/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const prefixPath = isProd ? '/mochiduko-24' : ''

const nextConfig = {
  output: 'export',
  experimental: {
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

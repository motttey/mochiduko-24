/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  images: {
    domains: ['embed.pixiv.net'],
  }
}

module.exports = nextConfig
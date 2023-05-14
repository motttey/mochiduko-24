/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['embed.pixiv.net'],
  },
}

module.exports = nextConfig

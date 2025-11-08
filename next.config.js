/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    QURAN_API_AUTH_URL: process.env.QURAN_API_AUTH_URL || 'https://prelive-oauth2.quran.foundation/oauth2/token',
    QURAN_API_BASE_URL: process.env.QURAN_API_BASE_URL || 'https://apis-prelive.quran.foundation/content/api/v4',
  },
}

module.exports = nextConfig


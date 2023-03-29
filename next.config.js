/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_SECRET_COOKIE_PASSWORD: process.env.AUTH_SECRET_COOKIE_PASSWORD,
  }
}

module.exports = nextConfig

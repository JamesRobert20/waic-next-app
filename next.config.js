/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  swcMinify: true,
}

module.exports = nextConfig

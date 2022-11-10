/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    transpilePackages: ["ui"],
  },
};

module.exports = nextConfig;

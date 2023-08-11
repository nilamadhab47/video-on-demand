/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

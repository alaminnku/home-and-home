/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "media.istockphoto.com",
      "scontent-tpe1-1.cdninstagram.com",
      "scontent-iad3-2.cdninstagram.com",
    ],
  },
};

module.exports = nextConfig;

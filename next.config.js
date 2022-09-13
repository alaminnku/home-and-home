/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "media.istockphoto.com",
      "scontent-tpe1-1.cdninstagram.com",
      "scontent-iad3-2.cdninstagram.com",
      "instagram.fcrk1-3.fna.fbcdn.net",
      "instagram.ftru2-1.fna.fbcdn.net",
      "instagram.ftru2-3.fna.fbcdn.net",
      "instagram.fcrk1-2.fna.fbcdn.net",
      "instagram.faqp1-1.fna.fbcdn.net",
      "instagram.fcrk1-5.fna.fbcdn.net",
      "instagram.ftru2-2.fna.fbcdn.net",
      "instagram.fczl1-2.fna.fbcdn.net",
      "scontent-ort2-1.cdninstagram.com"
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.panda.org"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.panda.org",
    //   },
    // ],
  }
};

module.exports = nextConfig;

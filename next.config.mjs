/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nobilita3",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

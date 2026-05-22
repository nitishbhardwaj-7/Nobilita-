/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nobilita3",
  output: "export",
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

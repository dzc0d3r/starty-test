/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === "1";
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: isVercel ? undefined : "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        protocol: "https",
      },

      {
        hostname: "portail-scpi.fr",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
};
export default nextConfig;

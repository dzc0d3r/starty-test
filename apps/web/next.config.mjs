/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: "standalone",
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
    ],
  },
};
export default nextConfig;

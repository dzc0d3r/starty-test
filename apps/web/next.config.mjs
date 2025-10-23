/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "portail-scpi.fr",
        protocol: "https",
      },
    ],
  },
};
export default nextConfig;

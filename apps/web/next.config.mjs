/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';
const baseConfig = {
  transpilePackages: ["@workspace/ui"],
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
let nextConfig = {}
if (isVercel) {
   nextConfig = {...baseConfig}
} else {
   nextConfig = {...baseConfig, output: 'standalone',}
}
export default nextConfig;

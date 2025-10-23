/** @type {import('next').NextConfig} */
// @ts-check
import withPlaiceholder from "@plaiceholder/next";
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
  }
};
export default withPlaiceholder(nextConfig);

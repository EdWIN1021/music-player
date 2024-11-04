/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/upload-song": ["./tmp/**/*"],
    },
  },
};

export default nextConfig;

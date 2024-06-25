/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/upload-song": ["./tmp/**/*"],
    },
  },
};

export default nextConfig;

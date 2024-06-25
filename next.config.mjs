/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/upload-song": ["./ffmpeg"],
    },
  },
};

export default nextConfig;

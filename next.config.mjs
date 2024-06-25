/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/upload-song": ["./ffmpeg", "./output.mp3"],
    },
  },
};

export default nextConfig;

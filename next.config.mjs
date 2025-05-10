/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com","/"],
  },
  experimental: {
    turbo: {
      // Turbopack is enabled when this object is present
      // You can include specific configurations here if needed
    },
  },
};

export default nextConfig;

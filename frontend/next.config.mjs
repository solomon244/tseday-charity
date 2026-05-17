/** @type {import('next').NextConfig} */
const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:4000";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.qwenlm.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

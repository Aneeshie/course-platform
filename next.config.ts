import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "www.orientsoftware.com",
      },
      {
        hostname: "img-c.udemycdn.com",
      },
      {
        hostname: "images.prismic.io",
      },
      {
        hostname: "fiverr-res.cloudinary.com",
      },
      {
        hostname: "i3.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

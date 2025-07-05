import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        hostname: "i3.ytimg.com"
      }
    ]
  }
};

export default nextConfig;

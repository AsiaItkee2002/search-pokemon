import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", 
  trailingSlash: true,  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon', 
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


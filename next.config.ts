import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',  // เปลี่ยนเส้นทางไปยัง /pokemon
        permanent: true,          // ใช้ permanent redirect
      },
    ];
  },
};

export default nextConfig;

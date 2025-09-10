import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Azure App Service용 최적화
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Azure App Service에서 정적 파일 서빙 최적화
  trailingSlash: false,
  // 환경 변수 설정
  env: {
    NOTIFICATION_BASE_URL: process.env.NOTIFICATION_BASE_URL,
  },
};

export default nextConfig;

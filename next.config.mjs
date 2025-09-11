/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  async rewrites() {
    return [
      { source: "/api/users/:path*", destination: `${process.env.USER_API}/:path*` },
      { source: "/api/appointments/:path*", destination: `${process.env.APPOINTMENT_API}/:path*` },
      // Guest 서비스는 /appointments/... 하위 경로를 사용하므로 별도 프리픽스 부여
      { source: "/api/guest/:path*", destination: `${process.env.GUEST_API}/:path*` },
      { source: "/api/locations/:path*", destination: `${process.env.LOCATION_API}/:path*` },
    ];
  },
};

export default nextConfig;

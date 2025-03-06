/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Предполагаем, что Django-сервер работает на порту 8000
      },
    ];
  },
};

module.exports = nextConfig; 
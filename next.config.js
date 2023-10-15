/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  env: {
    API_URL: 'http://127.0.0.1:1337/api'
  }
};

module.exports = nextConfig;

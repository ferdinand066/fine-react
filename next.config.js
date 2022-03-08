/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiPath: 'http://localhost:5000/'
  },
}

module.exports = nextConfig;

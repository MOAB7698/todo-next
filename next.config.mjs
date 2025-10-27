/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  experimental: {
    serverActions: { bodySizeLimit: '2mb' }
  }
};
export default nextConfig;

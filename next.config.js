/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/watch/o2o',
        permanent: false,
      },
      {
        source: '/watch',
        destination: '/watch/o2o',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

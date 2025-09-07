/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfyxxdsgaaqxggjnxlx.supabase.co', // Your specific Supabase hostname from the error
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'quickchart.io',
      }
    ],
  },
};

module.exports = nextConfig;
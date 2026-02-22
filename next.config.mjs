/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Preload critical resources
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
      ],
    },
  ],
};

export default nextConfig;

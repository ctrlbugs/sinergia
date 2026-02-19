import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure server only binds to localhost
  // This prevents showing network IP in console
  // Suppress source map warnings in development
  productionBrowserSourceMaps: false,
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  turbopack: {
    // Empty config to silence the webpack/turbopack warning
    // Source maps are disabled via productionBrowserSourceMaps: false
  },
  // Keep webpack config for backward compatibility if needed
  // Note: In Next.js 16, Turbopack is used by default, webpack config may be ignored
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false; // Disable source maps in development
    }
    return config;
  },
};

export default nextConfig;

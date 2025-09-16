/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove GitHub Pages specific configuration for Netlify
  // basePath and assetPrefix are not needed for Netlify
};

module.exports = nextConfig;

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Add these properties
  runtimeCaching: [],
  buildExcludes: [/middleware-manifest\.json$/],
  directoryIndex: '/',
  // Make sure service worker is at the root level
  sw: 'sw.js',
})(nextConfig);

export default config;
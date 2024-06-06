/** @type {import('next').NextConfig} */
const nextConfig = {};

webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.output.filename = 'static/chunks/[name].js';
      config.output.chunkFilename = 'static/chunks/[name].js';
    }
    return config;
  }

export default nextConfig;



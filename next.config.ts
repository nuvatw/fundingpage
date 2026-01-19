import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true, // 啟用 React Compiler 自動記憶化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 天快取
  },
  experimental: {
    optimizePackageImports: ['motion/react'],
  },
  // Mongoose compatibility for Vercel Serverless
  serverExternalPackages: ['mongoose'],
  // Turbopack 設定 (Next.js 16 預設使用)
  turbopack: {},
  // Webpack 設定 (用於非 Turbopack 建置)
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;

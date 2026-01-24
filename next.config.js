/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel: サーバーサイド機能を有効化（APIルート使用可能）
  // GitHub Pages用の静的エクスポートは無効化
  // output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.microcms-assets.io'],
    unoptimized: true,
  },
}

module.exports = nextConfig

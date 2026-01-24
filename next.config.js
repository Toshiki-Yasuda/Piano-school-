/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.microcms-assets.io'],
    unoptimized: true,
  },
  // GitHub Pages用（リポジトリ名に合わせて変更）
  basePath: process.env.NODE_ENV === 'production' ? '/Piano-school-' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Piano-school-' : '',
}

module.exports = nextConfig

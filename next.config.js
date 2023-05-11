/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'zntkmbxcutbjufpjomxo.supabase.co',
      'zntkmbxcutbjufpjomxo.supabase.in',
      'lh3.googleusercontent.com',
      'apps.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig

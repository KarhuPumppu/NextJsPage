const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.porssisahko.net/v1/latest-prices.json',
      }
    ]
  }
}

module.exports = nextConfig;

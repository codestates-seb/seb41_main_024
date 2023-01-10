/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, webpack }) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff|woff2|otf|eot)$/,
        use: 'file-loader',
      }
    );
    return config;
  },
};

module.exports = nextConfig;

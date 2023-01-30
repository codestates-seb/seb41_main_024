/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'https://www.11st.co.kr',
      'cdn.011st.com',
      'https://www.kurly.com',
      'https://gmarket.co.kr',
    ],
  },
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

    config.module.rules.map((rule) => {
      if (rule.test !== undefined && rule.test.source.includes('|svg|')) {
        rule.test = new RegExp(rule.test.source.replace('|svg|', '|'));
      }
    });

    return config;
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack', 'url-loader'],
//     });
//     return config;
//   },
// };
// module.exports = nextConfig;

//next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Next 11버전부터는 Webpack config를 next.config에 묶어서
  // 사용할수 있다고 한다.
  webpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
      },
    },
  },
};

module.exports = nextConfig;

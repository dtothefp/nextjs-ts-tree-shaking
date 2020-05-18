const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withSourceMaps(withBundleAnalyzer({
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // Swap so the Webpack uses the "module" field if present because if not for PostCSS modules
      // we will have a mismatch in classes between client and server
      // https://github.com/webpack/webpack/issues/5756
      config.resolve.mainFields = ['module', 'main'];
    }

    return config;
  },
}));

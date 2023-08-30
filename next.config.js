module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: 'raw-loader',
    });

    return config;
  },
};

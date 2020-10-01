const presets = [
  'babel-preset-expo', //
];

const env = {
  production: {
    plugins: ['react-native-paper/babel'],
  },
};

module.exports = function (api) {
  api.cache(true);
  return { presets, env };
};

const moduleResolverConfig = {
  root: './',
  alias: {
    '@app-navigation': './src/navigation',
    '@app-screens': './src/screens/*',
    '@app-components': './src/components',
    '@app-config': './src/config',
    '@app-shared': './src/shared',
  },
};

const presets = [
  'babel-preset-expo', //
];

const plugins = [
  ['module-resolver', moduleResolverConfig], //
];

const env = {
  production: {
    plugins: ['react-native-paper/babel'],
  },
};

module.exports = function (api) {
  api.cache(true);
  return { presets, plugins, env };
};

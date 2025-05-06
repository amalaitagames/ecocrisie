module.exports = function (api: { cache: (bool: boolean) => void }) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: ['nativewind/babel'],
    };
  };
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// const path = require('path');

// const extraNodeModules = {
//   'qb-core': path.resolve(__dirname + '/../qb-core/'),
// };

// const watchFolders = [path.resolve(__dirname + '/../src/')];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // resolver: {
  //   extraNodeModules,
  // },
  // watchFolders,
};

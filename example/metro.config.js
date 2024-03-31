const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require("path");
const pak = require("../package.json");
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const modules = Object.keys({
    ...pak.peerDependencies,
});
const root = path.resolve(__dirname, '..');
const config = {
    watchFolders: [root],
    resolver: {
        blockList: exclusionList(
            modules.map(
                m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
            ),
        ),

        extraNodeModules: modules.reduce((acc, name) => {
            acc[name] = path.join(__dirname, 'node_modules', name);
            return acc;
        }, {}),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

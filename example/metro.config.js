const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const fs = require('fs');
const pak = require('../package.json');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const defaultResolveRequest = require('metro-resolver').resolve;

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
const multipleModalsShim = path.resolve(root, 'src/shims/react-native-multiple-modals.js');
const defaultResolveRequest = require('metro-resolver').resolve;
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

        resolveRequest: (context, moduleName, platform) => {
            if (moduleName === 'react-native-multiple-modals') {
                const installedModulePath = path.join(
                    __dirname,
                    'node_modules',
                    moduleName,
                    'package.json',
                );

                if (fs.existsSync(installedModulePath)) {
                    return defaultResolveRequest(context, moduleName, platform);
                }

                return {
                    filePath: multipleModalsShim,
                    type: 'sourceFile',
                };
            }

            return defaultResolveRequest(context, moduleName, platform);
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

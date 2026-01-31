const { withUniwindConfig } = require('uniwind/metro');
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// your metro modifications

module.exports = withUniwindConfig(config, {
    cssEntryFile: './src/global.css',
    dtsFile: './src/types/uniwind-types.d.ts'
});

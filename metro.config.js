const { getDefaultConfig } = require('expo/metro-config');
const { withReactNativeCSS } = require('react-native-css/metro');

const defaultConfig = getDefaultConfig(__dirname);
module.exports = withReactNativeCSS(defaultConfig, {
  globalClassNamePolyfill: true,
});

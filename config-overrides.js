const {
  override,
  addDecoratorsLegacy,
  disableEsLint
} = require("customize-cra");
const path = require('path')

let envPath;
if (process.env.BUILD_ENV === 'production') {
  envPath = path.resolve(process.cwd(), '.production.env')
} else if (process.env.BUILD_ENV === 'staging') {
  envPath = path.resolve(process.cwd(), '.staging.env')
} else {
  envPath = path.resolve(process.cwd(), '.env')
}

const fileEnv = require('dotenv').config({ path: envPath }).parsed
console.log(fileEnv)
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[next] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find(plugin => plugin.constructor.name === pluginName);

const overrideProcessEnv = value => config => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  };

  return config;
};
module.exports = override(addDecoratorsLegacy(), disableEsLint(),  overrideProcessEnv(envKeys));

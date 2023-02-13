const { composePlugins, withNx } = require('@nrwl/webpack');

const { withWatchPoll } = require("./config-utils");

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
    withWatchPoll(config);
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config;
});
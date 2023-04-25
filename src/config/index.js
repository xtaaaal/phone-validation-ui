const prodConfig = require("./config.json");
const devConfig = require("./config.dev.json");

const config = Object.assign({}, prodConfig);

if (process.env.NODE_ENV === "development") {
  Object.assign(config, devConfig);
}

export default config;

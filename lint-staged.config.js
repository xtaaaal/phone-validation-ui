module.exports = {
  "*.{js,ts,tsx,css}": ["prettier . --write"],
  "*.{js,ts,tsx}": [
    "next lint . --cache --fix --ext .tsx --ext .ts",
    () => "yarn ts",
    // () => "yarn test:ci",
  ],
};

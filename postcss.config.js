module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      stage: 0,
      importFrom: ["pages/breakpoints.css"],
      autoprefixer: {
        flexbox: "no-2009",
      },
      features: {
        "custom-properties": false,
      },
    },
  },
};

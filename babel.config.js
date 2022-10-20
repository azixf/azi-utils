module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: "3.25.0",
        target: {
          ie: 10,
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
  ignore: ["node_modules/**"],
};

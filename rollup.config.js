import path from "path";
import dts from "rollup-plugin-dts";
import ts from "rollup-plugin-typescript2";

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}
export default [
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: resolve("./dist/index.esm.js"),
        format: "es",
      },
      {
        file: resolve("./dist/index.cjs.js"),
        format: "cjs",
      },
      {
        file: resolve("./dist/index.js"),
        format: "umd",
        name: "AziUtil"
      },
    ],
    plugins: [ts()],
  },
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: resolve("./dist/index.d.ts"),
        format: "es",
      },
    ],
    plugins: [dts()],
  },
];

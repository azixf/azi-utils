import path from "path";
import dts from "rollup-plugin-dts";
import ts from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

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
        name: "AziUtil",
      },
    ],
    plugins: [
      ts(),
      babel({
        exclude: ["node_modules"],
        babelHelpers: "runtime",
      }),
      commonjs(),
      nodeResolve({
        mainFields: ["jsnext", "main"],
        browser: true
      }),
      terser()
    ],
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

import path from "path";
import dts from "rollup-plugin-dts";
import ts from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}
export default [
  // core打包
  {
    input: "./src/core/index.ts",
    external: ["axios"],
    output: [
      {
        file: resolve("./dist/core/index.esm.js"),
        format: "esm",
      },
      {
        file: resolve("./dist/core/index.umd.js"),
        format: "umd",
        name: "AziUtils",
        globals: {
          axios: "Axios",
        },
      },
    ],
    plugins: [
      ts(),
      babel({
        babelHelpers: "runtime",
      }),
      nodeResolve({
        mainFields: ["jsnext", "main"],
        browser: true,
      }),
      terser(),
    ],
  },
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: resolve("./dist/core/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
  // vue directive 打包
  {
    input: "./src/vue/directives/index.ts",
    output: [
      {
        file: resolve("./dist/directives/index.umd.js"),
        format: "umd",
        name: "AziVueDirectives",
      },
      {
        file: resolve("./dist/directives/index.esm.js"),
        format: "esm",
      },
    ],
    plugins: [
      ts(),
      babel({
        babelHelpers: "runtime",
      }),
      nodeResolve({
        mainFields: ["jsnext", "main"],
        browser: true,
      }),
      terser(),
    ],
  },
  {
    input: "./src/vue/directives/index.ts",
    output: [
      {
        file: resolve("./dist/directives/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
];

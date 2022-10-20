import path from "path";
import dts from "rollup-plugin-dts";
import ts from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}
export default [
  {
    input: "./src/core/index.ts",
    external: ["axios"],
    output: [
      {
        file: resolve("./dist/index.mjs"),
        format: "es",
      },
      {
        file: resolve("./dist/index.cjs"),
        format: "cjs",
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
        browser: true,
      }),
      terser(),
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
  {
    input: "./src/style/index.ts",
    plugins: [
      copy({
        targets: [
          {
            src: "src/style/mixins.scss",
            dest: "dist/style",
            rename: "index.scss",
          },
        ],
      }),
      scss({
        output: "./dist/style/index.css",
        include: ["./src/style/*.scss"],
        processor: () =>
          postcss([
            autoprefixer({
              overrideBrowserslist: ["> 1%", "not dead"],
            }),
          ]),
      }),
    ],
  },
];

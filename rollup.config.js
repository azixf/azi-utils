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
import vue from "rollup-plugin-vue";

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
        file: resolve("./dist/index.mjs"),
        format: "esm",
      },
      {
        file: resolve("./dist/index.cjs"),
        format: "cjs",
      },
    ],
    plugins: [
      ts(),
      babel({
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
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
  // style打包
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
  // vue directive 打包
  {
    input: "./src/vue/directives/index.ts",
    output: [
      {
        file: resolve("./dist/vue/directives/index.cjs"),
        format: "cjs",
      },
      {
        file: resolve("./dist/vue/directives/index.mjs"),
        format: "esm",
      },
    ],
    plugins: [
      ts(),
      babel({
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
    input: "./src/vue/directives/index.ts",
    output: [
      {
        file: resolve("./dist/vue/directives/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
  // vue plugins 打包
  {
    input: "./src/vue/plugins/index.ts",
    external: ["fs"],
    output: [
      {
        file: resolve("./dist/vue/plugins/index.mjs"),
        format: "esm",
      },
      {
        file: resolve("./dist/vue/plugins/index.cjs"),
        format: "cjs",
      },
    ],
    plugins: [
      ts(),
      babel({
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
    input: "./src/vue/plugins/index.ts",
    external: ["fs"],
    output: [
      {
        file: resolve("./dist/vue/plugins/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
  // vue components 打包
  {
    input: "./src/vue/components/index.ts",
    output: [
      {
        file: resolve("./dist/vue/components/index.mjs"),
        format: "esm",
      },
    ],
    plugins: [
      ts(),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
      }),
      vue({
        target: "browser",
      }),
      scss({
        output: "./dist/vue/components/index.css",
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

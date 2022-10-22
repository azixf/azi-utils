import { PathLike } from "fs";
import { findSvgFile } from "../common/svgBuider";

/**
 * svg webpack插件
 * @param path 存储svg的文件夹路径 相对路径
 * @returns
 */
export class svgBuilderForWebpack {
  path: PathLike;
  constructor(path: PathLike) {
    this.path = path;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("svgBuilder", (compilation, callback) => {
      compilation.plugin(
        "html-webpack-plugin-before-html-processing",
        (htmlPluginData, callback) => {
          const res = findSvgFile(this.path);
          htmlPluginData.html = htmlPluginData.html.replace(
            "<body>",
            `
              <body>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                  ${res.join("")}
                </svg>
            `
          );
        }
      );
    });
  }
}

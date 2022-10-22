import { PathLike } from "fs";
import { findSvgFile } from "../common/svgBuider";

/**
 * svg vite插件
 * @param path 存储svg的文件夹路径 相对路径
 * @returns
 */
export const svgBuilderForVite = (path: PathLike) => {
  const res = findSvgFile(path);

  return {
    name: "svg-builder",
    transformIndexHtml(html: string) {
      return html.replace(
        "<body>",
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
            ${res.join("")}
            </svg>
        `
      );
    },
  };
};

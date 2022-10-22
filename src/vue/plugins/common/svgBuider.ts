import { readFileSync, readdirSync, PathLike } from "fs";

const svgStartTag = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;
const clearStyle = /<style([^>+].*?)>[^]+<\/style>/g;
const clearFill = /fill="(.*?)"/g;
const hasViewBox = /(viewBox="[^>+].*?")/g;
const clearReturn = /(\r|\n)/g;

export const findSvgFile = (dir: PathLike): string[] => {
  const svgRes: string[] = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + "/"));
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, "")
        .replace(clearStyle, "")
        .replace(clearFill, "")
        .replace(svgStartTag, ($1: string, $2: string) => {
          let width = 0;
          let height = 0;
          let content = $2.replace(
            clearHeightWidth,
            (s1: string, s2: string, s3: number) => {
              if (s2 === "width") {
                width = s3;
              } else if (s2 === "height") {
                height = s3;
              }
              return "";
            }
          );
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`;
          }
          return `<symbol id="icon-${dirent.name.replace(
            ".svg",
            ""
          )}" ${content}>`;
        })
        .replace("</svg>", "</symbol>");
      svgRes.push(svg);
    }
  }

  return svgRes;
};

export type FormatType =
  | "YYYY"
  | "YYYY-MM-DD"
  | "YYYY-MM"
  | "MM-DD"
  | "YYYY-MM-DD hh:mm:ss"
  | "YYYY-MM-DD hh:mm"
  | "hh:mm"
  | "hh:mm:ss";

export interface DefaultPadStringOptions {
  padding: string; // 填充的字符
  length: number; // 填充的长度
  position: "start" | "end"; // 填充的位置
}

export interface PadStringOptions extends Partial<DefaultPadStringOptions> {
  origin: string; // 原始字符串
}

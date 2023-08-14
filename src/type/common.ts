export type BasiclyType = number | string | undefined | null;
export interface DefaultPadStringOptions {
  padding: string; // 填充的字符
  length: number; // 填充的长度
  position: "start" | "end"; // 填充的位置
}

export interface PadStringOptions extends Partial<DefaultPadStringOptions> {
  origin: string; // 原始字符串
}

export type ForEachOriginType =
  | Array<unknown>
  | Record<string, unknown>
  | Map<unknown, unknown>
  | Set<unknown>;

export type isDataTruelyType = ForEachOriginType | BasiclyType;

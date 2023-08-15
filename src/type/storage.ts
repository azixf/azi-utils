export interface DefaultOptions {
  type: "localStorage" | "sessionStorage";
  prefix: string;
  secret: string;
}

export type StorageOptions = Partial<DefaultOptions>;

export interface StorageData {
  value: any;
  expireAt: number | null;
}

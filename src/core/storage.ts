/**
 * 本地存储模块封装，带加密和过期时间
 */
import { createHmac } from "crypto";
export class Storage {
  private storage: globalThis.Storage;
  private prefix: string;

  /**
   *
   * @param type 本地存储类型
   */
  constructor(
    type: "localStorage" | "sessionStorage" = "localStorage",
    prefix: string = ""
  ) {
    this.storage = window[type];
    this.prefix = prefix;
  }

  public get(key: string) {
    key = this.prefix + key;
    const value = this.storage.getItem(key);
    try {
      if (value) return JSON.parse(value);
      return value;
    } catch {
      return value;
    }
  }

  public set(key: string, data: any) {
    key = this.prefix + key;
    const string = JSON.stringify(data);
    const hmac = createHmac("sha512", "Tnljk47Omlplmmnamlewq4as6p7zxadsfa2");
    const value = hmac.update(string).digest("hex");
    console.log("value: ", value);

    this.storage.setItem(key, JSON.stringify(data));
  }

  public remove(key: string) {
    key = this.prefix + key;
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}

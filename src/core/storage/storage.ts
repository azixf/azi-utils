import {
  DefaultOptions,
  StorageOptions,
  StorageData,
} from "../../type/storage";

/**
 * 本地存储模块封装，带加密和过期时间
 */
export class Storage {
  private storage: globalThis.Storage;
  private prefix: string;

  /**
   *
   * @param type 存储类型
   * @param prefix 存储键前缀
   * @param secret 加解密凭证
   */
  constructor(options: StorageOptions = {}) {
    const defaultOptions: DefaultOptions = {
      type: "localStorage",
      prefix: "",
    };
    const resolvedOptions = Object.assign(defaultOptions, options);
    this.storage = window[resolvedOptions.type];
    this.prefix = resolvedOptions.prefix;
  }

  public get(key: string) {
    key = this.prefix + key;
    let value: any = null;
    let data: string | null = this.storage.getItem(key);
    try {
      if (data) {
        const parsedData: StorageData = JSON.parse(data as string);
        if (!parsedData.expireAt) {
          value = parsedData.value;
        } else {
          const now = +new Date();
          if (now <= parsedData.expireAt) {
            value = parsedData.value;
          } else {
            value = null;
            this.remove(key);
          }
        }
      }
    } catch {}

    return value;
  }

  public set(key: string, data: any, expires: number = 0) {
    key = this.prefix + key;
    const resolvedData: StorageData = {
      value: data,
      expireAt: expires ? +new Date() + expires : null,
    };
    let string = JSON.stringify(resolvedData);

    this.storage.setItem(key, string);
  }

  public remove(key: string) {
    key = this.prefix + key;
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}

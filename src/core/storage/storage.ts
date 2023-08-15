import { DefaultOptions, StorageOptions, StorageData } from "@/type/storage";
import { CryptoUtil } from "./crypto";

/**
 * 本地存储模块封装，带加密和过期时间
 */
export class Storage {
  private storage: globalThis.Storage;
  private secret: string;
  private prefix: string;
  private cryptoUtil?: CryptoUtil;

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
      secret: "",
    };
    const resolvedOptions = Object.assign(defaultOptions, options);
    this.storage = window[resolvedOptions.type];
    this.prefix = resolvedOptions.prefix;
    this.secret = resolvedOptions.secret;
    if (this.secret) {
      this.cryptoUtil = new CryptoUtil(this.secret);
    }
  }

  public get(key: string) {
    key = this.prefix + key;
    let value: any = null;
    let data: string | null = this.storage.getItem(key);
    if (data && this.cryptoUtil) {
      data = this.cryptoUtil.decrypt(data as string);
    }
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
    if (this.cryptoUtil) {
      string = this.cryptoUtil.encrypt(string);
    }

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

import { AES, enc, mode, pad } from "crypto-js";

export class CryptoUtil {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }

  public encrypt(data: string): string {
    const cipherText = AES.encrypt(data, this.key, {
      mode: mode.ECB,
      padding: pad.Pkcs7,
    }).toString();
    return cipherText;
  }

  public decrypt(data: string): string {
    const bytes = AES.decrypt(data, this.key, {
      mode: mode.ECB,
      padding: pad.Pkcs7,
    });
    const originalText = bytes.toString(enc.Utf8);
    return originalText;
  }
}

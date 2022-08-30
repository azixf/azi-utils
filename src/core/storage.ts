export class Storage {
  private storage: globalThis.Storage = window.localStorage

  /**
   * 
   * @param type 本地存储类型
   */
  constructor(type?: 'localStorage' | 'sessionStorage') {
    if(type) {
      this.storage = window[type]
    }
  }

  private get(key: string) {
    const value =  this.storage.getItem(key)
    try {
      if(value) return JSON.parse(value)
      return value
    } catch {
      return value
    }
  }

  private set(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data))
  }

  private remove(key:string) {
    this.storage.removeItem(key)
  }

  private clear() {
    this.storage.clear()
  }
}
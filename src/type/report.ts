// 默认参数
export interface DefaultOptions {
  appId: string | undefined, // 应用标识
  uuid: string | undefined, // 用户标识
  requestUrl: string | undefined, // 请求地址
  historyReporter: boolean, // 开启history上报
  hashReporter: boolean, // 开启hash上报
  domReporter: boolean, // 开启targetKey事件上报
  repoterVersion: string | number, // reporter sdk 版本号
  extraData: Record<string, any> | undefined, // 用户自定义数据
  jsErroer: boolean, // js 和 promise 错误上报
  browserType: string | undefined, // 浏览器类型
  browserVersion: string | number, // 浏览器版本
  language: string | undefined, // 语言
  osType: string | undefined, // 设备类型
  osVersion: string | number, // 设备版本
  title: string | undefined, // 页面标题
  url: string | undefined, // 页面路径
  domPath: string | undefined, // 事件触发的dom
  offsetX: number | undefined, // 事件触发的dom的x坐标
  offsetY: number | undefined, // 事件触发的dom的y坐标
}

// 必传参数
export interface ReporterOptions extends Partial<DefaultOptions> {
  requestUrl: string,
  appId: string
}

// reporter配置
export enum ReporterConfig {
  version = "1.0.0"
}

// 上报数据必传参数
export interface ReporterData {
  [key:string]: any,
  event: string,
  targetKey: string
}
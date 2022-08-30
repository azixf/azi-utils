interface DefaultOptions {
    appId: string | undefined;
    uuid: string | undefined;
    requestUrl: string | undefined;
    historyReporter: boolean;
    hashReporter: boolean;
    domReporter: boolean;
    repoterVersion: string | number;
    extraData: Record<string, any> | undefined;
    jsErroer: boolean;
    browserType: string | undefined;
    browserVersion: string | number;
    language: string | undefined;
    osType: string | undefined;
    osVersion: string | number;
    title: string | undefined;
    url: string | undefined;
    domPath: string | undefined;
    offsetX: number | undefined;
    offsetY: number | undefined;
}
interface ReporterOptions extends Partial<DefaultOptions> {
    requestUrl: string;
    appId: string;
}
interface ReporterData {
    [key: string]: any;
    event: string;
    targetKey: string;
}

/**
 * 埋点上报sdk
 */

declare class Reporter {
    data: ReporterOptions;
    private version;
    constructor(options: ReporterOptions);
    private initDef;
    setUserId<T extends DefaultOptions["uuid"]>(uuid: T): void;
    setExtraData<T extends DefaultOptions["extraData"]>(extra: T): void;
    sendReporter<T extends ReporterData>(data: T): void;
    /**
     * 信息上报
     * @param data
     */
    private report;
    private installInnerReporter;
    /**
     * 监听事件
     * @param MouseEventList
     * @param targetKey
     * @param data
     */
    private captureEvents;
    private targetReport;
    private jsReport;
    private captureJsError;
    private capturePromiseReject;
}

/**
 * 本地存储模块封装
 */
declare class Storage {
    private storage;
    /**
     *
     * @param type 本地存储类型
     */
    constructor(type?: 'localStorage' | 'sessionStorage');
    private get;
    private set;
    private remove;
    private clear;
}

declare type FormatType = "YYYY" | "YYYY-MM-DD" | "YYYY-MM" | "MM-DD" | "YYYY-MM-DD hh:mm:ss" | "YYYY-MM-DD hh:mm" | "hh:mm" | "hh:mm:ss";
interface PadStringDefaultOptions {
    padding: string;
    length: number;
    position: "start" | "end";
}
interface PadStringOptions extends Partial<PadStringDefaultOptions> {
    origin: string;
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟 ms
 * @param immediately 是否立即执行一次
 */
declare function debounce(fn: (...args: any[]) => void, delay?: number, immediately?: boolean): (this: unknown, ...args: any[]) => void;
/**
 * 节流函数
 * @param fn 执行函数
 * @param delay 延迟时间 ms
 * @param immediately 是否立即执行一次
 * @returns
 */
declare function throttle(fn: (...args: any[]) => void, delay?: number, immediately?: boolean): (this: unknown, ...args: any[]) => void;
/**
 * 时间格式化
 * @param origin 类日期参数
 * @param format 格式
 * @returns string
 */
declare const dateFormat: (origin: any, format: FormatType) => string;
/**
 * 填充字符串
 * @param paddingOptions 填充参数
 * @returns
 */
declare const padString: (paddingOptions: PadStringOptions) => string;

export { Reporter, Storage, dateFormat, debounce, padString, throttle };

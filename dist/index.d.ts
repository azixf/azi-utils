import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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

declare type BasiclyType = number | string | undefined | null;
declare type FormatType = "YYYY" | "YYYY-MM-DD" | "YYYY-MM" | "MM-DD" | "YYYY-MM-DD hh:mm:ss" | "YYYY-MM-DD hh:mm" | "hh:mm" | "hh:mm:ss";
interface DefaultPadStringOptions {
    padding: string;
    length: number;
    position: "start" | "end";
}
interface PadStringOptions extends Partial<DefaultPadStringOptions> {
    origin: string;
}
declare type ForEachOriginType = Array<unknown> | Record<string, unknown> | Map<unknown, unknown> | Set<unknown>;
declare type isDataTruelyType = ForEachOriginType | BasiclyType;

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
/**
 * 重置对象
 * @param origin 需要重置的对象
 * @param replaceItem 重置为的值 默认：undefined
 */
declare const resetObject: (origin: Record<string, unknown>, replaceItem?: any) => void;
/**
 *  获取数据精准类型
 * @param target
 * @returns string
 */
declare const getExactType: (target: unknown) => string;
/**
 * 简单对象深拷贝
 * @param origin 拷贝对象
 * @returns
 */
declare const cloneDeep: (origin: unknown) => unknown;
/**
 * 遍历常用对象
 * @param origin 遍历的对象 可以是数组、对象、Map、Set
 * @param callback 循环回调函数
 */
declare const forEach: <T extends ForEachOriginType>(origin: T, callback: (item: any, index: unknown, origin: T) => void) => void;
/**
 * 判断变量的判断结果是否是true
 * @param data 判断的数据
 * @returns
 */
declare const isDataTruely: (data: isDataTruelyType) => boolean;

interface DefaultRequestOptions {
    withCredentials: boolean;
    timeout: number;
    timeoutErrorMessage: string;
}
interface RequestOptions extends Partial<DefaultRequestOptions> {
    baseURL: string;
}
declare type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";
declare type RequestFunction = (url: string, data: any, config: Partial<AxiosRequestConfig>) => Promise<AxiosResponse['data']>;

declare class Request {
    private instance;
    httpGet: RequestFunction;
    httpPost: RequestFunction;
    httpDelete: RequestFunction;
    httpPut: RequestFunction;
    constructor(requestOptions: RequestOptions);
    private initDef;
    /**
     * 设置请求拦截器
     * @param requestHanlder
     */
    setRequestInterceptor(requestHanlder?: (config: AxiosRequestConfig) => AxiosRequestConfig): void;
    /**
     * 设置响应拦截器
     * @param responseHandler
     * @param errorHandler
     */
    setResponseHandler(responseHandler?: (res: AxiosResponse) => Promise<AxiosResponse["data"]>, errorHandler?: (err: AxiosError) => Promise<AxiosError>): void;
    /**
     * 请求方法
     * @param method
     * @param url
     * @param data
     */
    request(method: RequestMethod, url: string, data: any, config?: Partial<AxiosRequestConfig>): void;
    private install;
}

export { Reporter, Request, Storage, cloneDeep, dateFormat, debounce, forEach, getExactType, isDataTruely, padString, resetObject, throttle };

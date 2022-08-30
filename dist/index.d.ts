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

export { Reporter, Storage };

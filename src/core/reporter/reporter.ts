/**
 * 埋点上报sdk
 */

import {
  DefaultOptions,
  ReporterConfig,
  ReporterData,
  ReporterOptions,
} from "../../type/report";
import { createHistoryEvent } from "./event";

const MouseEventList: string[] = [
  "click",
  "dbclick",
  "contextmenu",
  "mousedown",
  "mouseup",
  "mouseenter",
  "mouseout",
  "mouseover",
];

export class Reporter {
  public data!: ReporterOptions;
  private version: string | undefined;

  public constructor(options: ReporterOptions) {
    this.data = Object.assign(this.initDef(), options);
    this.installInnerReporter();
  }

  private initDef(): DefaultOptions {
    this.version = ReporterConfig.version;
    window.history["pushstate"] = createHistoryEvent("pushState");
    window.history["replaceState"] = createHistoryEvent("replaceState");
    return <DefaultOptions>{
      domReporter: false,
      historyReporter: false,
      hashReporter: false,
      jsErroer: false,
      repoterVersion: this.version,
    };
  }

  public setUserId<T extends DefaultOptions["uuid"]>(uuid: T) {
    this.data.uuid = uuid;
  }

  public setExtraData<T extends DefaultOptions["extraData"]>(extra: T) {
    this.data.extraData = extra;
  }

  public sendReporter<T extends ReporterData>(data: T) {
    this.report(data);
  }

  /**
   * 信息上报
   * @param data
   */
  private report<T>(data: T) {
    const params = Object.assign(this.data, data, { time: Date.now() });
    const headers = {
      type: "application/x-www-form-urlencoded",
    };
    const blob = new Blob([JSON.stringify(params)], headers);
    navigator.sendBeacon(this.data.requestUrl, blob);
  }

  private installInnerReporter(): void {
    if (this.data.historyReporter) {
      this.captureEvents(["pushstate"], "history-pv");
      this.captureEvents(["replacestate"], "history-pv");
      this.captureEvents(["popstate"], "history-pv");
    }
    if (this.data.hashReporter) {
      this.captureEvents(["hashchange"], "hash-pv");
    }
    if (this.data.domReporter) {
      this.targetReport();
    }
    if (this.data.jsErroer) {
      this.jsReport();
    }
  }

  /**
   * 监听事件
   * @param MouseEventList
   * @param targetKey
   * @param data
   */
  private captureEvents<T>(
    MouseEventList: string[],
    targetKey: string,
    data?: T
  ) {
    MouseEventList.forEach((event) => {
      window.addEventListener(event, () => {
        this.report({ event, targetKey, data });
      });
    });
  }

  private targetReport() {
    MouseEventList.forEach((event) => {
      window.addEventListener(event, (e) => {
        const target = e.target as HTMLElement;
        const targetValue = target.getAttribute("target-key");
        if (targetValue) {
          this.sendReporter({
            targetKey: targetValue,
            event,
          });
        }
      });
    });
  }

  private jsReport() {
    this.captureJsError()
    this.capturePromiseReject()
  }

  // 捕获js错误
  private captureJsError() {
    window.addEventListener("error", (e) => {
      this.sendReporter({
        targetKey: "js-error",
        event: "js",
        message: e.message
      });
    });
  }

  private capturePromiseReject() {
    window.addEventListener('unhandledrejection', (event) => {
      event.promise.catch(error => {
        this.sendReporter({
          targetKey: "promise-error",
          event: "promise",
          message: error
        })
      })
    })
  }
}

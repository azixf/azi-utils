import {
  FormatType,
  DefaultPadStringOptions,
  PadStringOptions,
} from "../type/common";

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟 ms
 * @param immediately 是否立即执行一次
 */
export function debounce(
  fn: (...args: any[]) => void,
  delay: number = 200,
  immediately: boolean = false
) {
  let timer: null | NodeJS.Timeout;
  return function (this: unknown, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (immediately) {
      immediately = false;
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer!);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 执行函数
 * @param delay 延迟时间 ms
 * @param immediately 是否立即执行一次
 * @returns
 */
export function throttle(
  fn: (...args: any[]) => void,
  delay: number = 200,
  immediately: boolean = false
) {
  let timer: NodeJS.Timeout | null;
  return function (this: unknown, ...args: any[]) {
    if (timer) return;
    if (immediately) {
      immediately = false;
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer!);
      timer = null;
    }, delay);
  };
}

/**
 * 时间格式化
 * @param origin 类日期参数
 * @param format 格式
 * @returns string
 */
export const dateFormat = (origin: any, format: FormatType): string => {
  if (!origin) return origin;
  if (typeof origin === "string") {
    origin = origin.replace("-", "/");
  }
  const date = new Date(origin);
  if (isNaN(date.getTime())) {
    console.error(`${origin} is not a valid datelike parameter`);
    return origin;
  }

  const YYYY = date.getFullYear() + "";
  const MM = padString({
    origin: date.getMonth() + 1 + "",
  });
  const DD = padString({ origin: date.getDate() + "" });

  const hh = padString({ origin: date.getHours() + "" });
  const mm = padString({ origin: date.getMinutes() + "" });
  const ss = padString({ origin: date.getSeconds() + "" });

  return format
    .replace("YYYY", YYYY)
    .replace("MM", MM)
    .replace("DD", DD)
    .replace("hh", hh)
    .replace("mm", mm)
    .replace("ss", ss);
};

/**
 * 填充字符串
 * @param paddingOptions 填充参数
 * @returns
 */
export const padString = (paddingOptions: PadStringOptions): string => {
  const defaultOptions: DefaultPadStringOptions = {
    padding: "0",
    length: 2,
    position: "end",
  };
  const { origin, padding, length, position } = Object.assign(
    defaultOptions,
    paddingOptions
  );
  return position === "start"
    ? origin.padStart(length, padding)
    : origin.padEnd(length, padding);
};

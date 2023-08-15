import {
  DefaultPadStringOptions,
  PadStringOptions,
  ForEachOriginType,
  isDataTruelyType,
} from "../../type/common";

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
export const dateFormat = (origin: any, format: string): string => {
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
    .replace("yyyy", YYYY)
    .replace("MM", MM)
    .replace("DD", DD)
    .replace("dd", DD)
    .replace("hh", hh)
    .replace("HH", hh)
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

/**
 * 重置对象
 * @param origin 需要重置的对象
 * @param replaceItem 重置为的值 默认：null
 */
export const resetObject = (
  origin: Record<string, unknown>,
  replaceItem: any = null
): void => {
  for (let item in origin) {
    origin[item] = replaceItem;
  }
};

/**
 *  获取数据精准类型
 * @param target
 * @returns string
 */
export const getExactType = (target: unknown): string => {
  return Object.prototype.toString
    .call(target)
    .replace(/[\[\]]/g, "")
    .split(" ")[1];
};

/**
 * 简单对象深拷贝
 * @param origin 拷贝对象
 * @returns
 */
export const cloneDeep = (origin: unknown) => {
  if (typeof origin !== "object") return origin;
  const target = Array.isArray(origin) ? [] : {};
  for (const key in origin) {
    target[key] =
      typeof origin[key] === "object" ? cloneDeep(origin[key]) : origin[key];
  }
  return target;
};

/**
 * 遍历常用对象
 * @param origin 遍历的对象 可以是数组、对象、Map、Set
 * @param callback 循环回调函数
 */
export const forEach = <T extends ForEachOriginType>(
  origin: T,
  callback: (item: any, index: unknown, origin: T) => void
): void => {
  const type = getExactType(origin);
  if (type === "Array") {
    for (let i = 0; i < (origin as Array<unknown>).length; i++) {
      callback(origin[i], i, origin);
    }
  } else if (type === "Map") {
    (origin as Map<unknown, unknown>).forEach((value, key) => {
      callback(value, key, origin);
    });
  } else if (type === "Set") {
    (origin as Set<unknown>).forEach((value1, value2) => {
      callback(value1, value2, origin);
    });
  } else {
    for (const key in origin) {
      callback(origin[key], key, origin);
    }
  }
};

/**
 * 判断变量的判断结果是否是true
 * @param data 判断的数据
 * @returns
 */
export const isDataTruely = (data: isDataTruelyType): boolean => {
  if (data === "" || data == undefined) return false;
  const ty = getExactType(data);
  if (ty === "Array") {
    return !!(data as Array<unknown>).length;
  } else if (ty === "Map" || ty === "Set") {
    return !!(data as Map<unknown, unknown> | Set<unknown>).size;
  } else if (ty === "Object") {
    return !!Object.keys(data).length;
  } else {
    return true;
  }
};

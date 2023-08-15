/**
 * 重写history replaceState pushstate事件
 * @param type 
 * @returns 
 */
export const createHistoryEvent = <T extends keyof History>(type: T):() => any => {
    const originFunc = history[type]
    return function(this:unknown) {
      const result = originFunc.apply(this, arguments)
      const event = new Event(type)
      window.dispatchEvent(event)
      return result
    }
  }
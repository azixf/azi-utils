# @azi/utils

> Common tool function encapsulation

> 通用函数封装

# install

```shell
  npm i -D azi-utils
  yarn add - D azi-utils
  pnpm add -D azi-utils
```

# usage
- esmodule
  ```ts
  import { debounce } from "@azi/utils";
  const onInput = debounce((e) => {
    const target = e.target as HTMLElement;
    const value = target.value;
    // code hear
  }, 800);
  ```
- commonjs
  ```js
  const { dateFormat } = require("@azi/utils");
  const date = 1661878650879;
  console.log(dateFormat(date, "YYYY-MM-DD hh:mm:ss"));
  ```

# functions
- Reporter
  > 前端埋点sdk

- Storage
  > 本地存储模块封装

- 通用函数封装
  - debounce
  - throttle
  - dateFormat
  - padString

- Request
  > http请求模块封装
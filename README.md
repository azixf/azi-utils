# @azi/utils

> Common tool function encapsulation

> 通用函数封装

# install

```shell
  npm i -D @azi/utils
  yarn add - D @azi/utils
  pnpm add -D @azi/utils
```

# usage

- browser
  ```js
  <script src="./node_modules/@azi/utils/dist/index.js"></script>
  <script>
    const { Storage } = AziUtil
    const storage = new Storage("localStorage")
    storage.get("token")
  <script>
  ```
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

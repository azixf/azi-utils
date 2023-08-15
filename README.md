# azi-utils

> Common tool function encapsulation

> 通用函数、vue 指令封装

# install

```shell
  npm i -D azi-utils
  yarn add - D azi-utils
  pnpm add -D azi-utils(recommended)
```

# usage

- esmodule
  ```ts
  import { debounce } from "azi-utils";
  const onInput = debounce((e) => {
    const target = e.target as HTMLElement;
    const value = target.value;
    // code hear
  }, 800);
  ```
- umd
  ```js
  <script src="./node_modules/azi-utils"></script>
  <script>
    const { dateFormat } = window.AziUtils;
    const date = 1661878650879;
    console.log(dateFormat(date, "YYYY-MM-DD hh:mm:ss"));
  </script>
  ```

# functions

- Reporter

  > 前端埋点 sdk

- Storage

  > 本地存储模块封装

- Request

  > http 请求模块封装

- 其他通用函数封装
  - debounce 防抖
  - throttle 节流
  - dateFormat 基本的时间格式化
  - padString 字符串填充
  - getExactType 获取所有数据的数据类型
  - resetObject 重置对象，一般用于表单和搜索区域等
  - deepClone 数组或对象的深拷贝
  - forEach 数组、对象、Map、Set 遍历

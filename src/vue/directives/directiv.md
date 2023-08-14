# 自定义指令

## 生命周期

### vue3

- created；在绑定元素的 attribute 或事件监听器被应用之前调用；
- beforeMount：当指令第一次绑定到元素并且在挂载父组件之前调用；
- mounted：在绑定元素的父组件被挂载后调用；
- beforeUpdate：在更新包含组件的 VNode 之前调用；
- updated：在包含组件的 VNode 及其子组件的 VNode 更新后调用；
- beforeUnmount：在包含组件的 VNode 及其子组件的 VNode 更新后调用；
- unmounted：当指令与元素解除绑定且父组件已卸载时，只调用一次；

### vue2

- bind：被绑定
- inserted：被插入
- update：更新
- componentUpdated：更新完成
- unbind：解绑

## 参数

### vue3

- el：dom

- bindings

  > v-bind:arg.modifier1.modirier2 = value

  - arg: v-bind:arg
  - dir: 指令本身
  - modifiers：修饰符，
  - instance：vue 实例
  - oldValue：旧值
  - value：新值

- VNode：虚拟 dom

- preVNode：旧虚拟 dom

### vue2

- el：dom
- bindings

  > v-mydirective:expression.modifier1,modifier2 = value

  - def：指令本身
  - expression：
  - modifiers：修饰符
  - rawName：指令的字符串
  - value：绑定的值

- VNode：虚拟 dom

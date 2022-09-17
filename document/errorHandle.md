# vue 错误捕获

## 捕获错误

vue 提供了 `errorHandle` 钩子，当内部组件发生渲染错误时，能够拿到 错误堆栈、错误节点的VM、错误发生时所处的生命周期

code

```js

```

## 处理错误日志

根据错误节点的 VM 拿到对应组件的 file地址、组件名称和父节点信息，以此类推遍历整个树，组装成 组件渲染堆栈信息

## 效果

![log](../assets/images/trace.jpg)
![log1](../assets/images/trace2.png)

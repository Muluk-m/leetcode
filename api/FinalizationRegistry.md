# FinalizationRegistry

[FinalizationRegistry](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) 对象可以让你在对象被垃圾回收时请求一个回调。

你在回调中创建了如下的 registry：

```js
const registry = new FinalizationRegistry(heldValue => {
  // ....
});
```

然后，你可以通过调用 register 方法，注册任何你想要清理回调的对象，传入该对象和所含的值。

```js
registry.register(theObject, "some value");
```

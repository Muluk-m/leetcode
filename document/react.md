# React 设计思想

## 老的React架构 react 15

Reconciler和Renderer是交替工作的
缺点：一旦组件变化，递归更新，所以更新一旦开始，中途就无法中断，层级很深超过16ms时，用户交互卡顿

- stack Reconcile（协调器）
  负责找出变化的组件
- Renderer（渲染器）
  负责将变化的组件渲染到页面上

## 新的React架构 react 16.8+

整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

- Schedule（调度器）新增
  调度任务的优先级，高优任务优先进入Reconciler
- fiber Reconcile（协调器）
- Renderer（渲染器）

### Schedule（调度器）

以浏览器是否剩余可用渲染时间为任务中断的标准
也就是 `requestIdleCallback` 的实现，但是由于兼容性和触发不稳定，react自己实现了 requestIdleCallback 的polyfill

## 事件系统

1. 合成事件 [link](https://segmentfault.com/a/1190000011413181)
  React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等，这套事件机制被称之为合成事件。
2. 实现机制
  React 底层主要对合成事件做了两件事：*事件委派* 和 *自动绑定*。

## setState

1. setState 是同步的开始异步的 [link](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/set-state#%E5%BC%82%E6%AD%A5%E4%B8%8E%E5%90%8C%E6%AD%A5)

   ```md
   setState 在 *react事件系统中*  和 *react生命周期里*（除componentDidUpdate外）是异步的，其他是同步的
   当更新策略正在 事务流 的执行中时，该组件更新会被推入 `dirtyComponents` 队列中等待执行；否则，开始执行 `batchedUpdates` 队列更新。
   ```

2. 批量更新  [link](https://juejin.cn/post/6844903513198166030)
  在合成事件和生命周期函数中，setState 更新队列时，存储的是合并状态（Object.assign）。因此前面设置的键值会被后面设置的键值覆盖，最终只会执行一次更新。

## React的生命周期

| mount       | update                                | unmount | error                    |
| :---------- | :------------------------------------ | :------ | :----------------------- |
| constructor | componentWillReceiveProps（Discard）   | -       | -                        |
| getDerivedStateFormProps | getDerivedStateFormProps | -       | getDerivedStateFromError |
| -                        | shouldComponentUpdate    | -       | -                        |
| componentWillMount（Discard）| componentWillUpdate（Discard）| -    | -                    |
| render                   | render                    | -       | -                        |
| -                        | getSnapshotBeforeUpdate   | -       | -                        |
| componentDidMount  | componentDidUpdate    | componentWillUnMount | componentDidCatch      |

## 阶段

 Schedule
 Reconcile（可中断可恢复）
 Render
 commit

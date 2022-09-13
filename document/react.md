# React 设计思想

## 老的React架构 react 15

Reconciler和Renderer是交替工作的
缺点：一旦组件变化，递归更新，所以更新一旦开始，中途就无法中断，层级很深超过16ms时，用户交互卡顿

- Reconcile（协调器）
  负责找出变化的组件
- stack Renderer（渲染器）
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

合成事件，抹平浏览器差异

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

## 个人信息

- 姓名：马启骞
- 邮箱：<maqiqian0316@163.com>
- 电话：13713638967
- 工作年限：5年
- 技术博客：<https://wuji-io.vercel.app/projects>
- Github：<https://github.com/Muluk-m>
- 学历：河北地质大学/本科
- 目标职位：前端开发工程师

## 专业技能

1. 掌握 React、RN、Vue2/3 主流开发技术,熟练使用 TypeScript
2. 熟悉 SSR、Hybrid App 等开发模式
3. 熟悉前端主流架构, 熟悉 SPA 应用和 MPA 应用和微前端架构方案
4. 熟悉 NodeJs 掌握 Express、Koa、Egg、Nest 等技术
5. 了解 HTTP，TCP/IP 协议,熟悉处理网络请求，和基本网络安全知识
6. 熟练使用 git 版本管理, 熟悉 dockerfile、nginx 基本配置
7. 了解主流工程构建技术, 如 webpack、rollup、vite、esbuild 等

## 工作经历

- 2022.11-至今 Klook 高级前端开发
  **工作描述**: 负责初期客服系统搭建、IM SDK 初期技术选型与研发, 部分 C 端与 Infra 工作
- 2022.03-2022.09 北京多来点信息科技有限公司  高级前端开发  
  **工作描述**: 负责企业协同管理系统 “跳房子” pc、app、h5三端的前端研发与维护工作
- 2020.11-2022.03 美团优选 web前端开发  
  **工作描述**: 负责优选数据产品和 bi 工具的研发与维护
- 2018.07-2020.11 北京虹软协创通讯技术有限公司 web前端开发  
  **工作描述**: 负责公司官网、内部管理平台研发与维护

## 项目经历

### 项目一：客服工作台

##### 技术选型

react、ts、umi/max、swr、tailwindcss、jotai、ant-pro

##### 项目背景  

从第三方 sass 客服系统到自研客服系统迁移, 集成工单、客服效率追踪、知识库、即时会话、用户管理、邮件等能力
  
##### 技术要点

1. 数据流采用 jotai 的原子化状态方案, 结合 namespace 的 atom 管理, 使状态管理更灵活易用
2. 项目中有较多轮询/调度的场景, 封装了 reactiveTaskScheduler 工具类, 用于管理任务调度
3. 使用 tailwind + antd 完成整套 chat 组件库开发
4. 使用 lruMap 缓存订单卡片、活动卡片数据来优化性能

### 项目二：IM SDK (即时通讯)

##### 技术选型

mqtt、ts、rxjs、localforage、vitest

##### 项目背景  

面向公司内部的 IM sdk, 主要服务于客户工作台系统, 底层使用基于 mqtt 协议的长链接, 包含mqtt连接、消息与会话管理、数据管理、context 等模块
  
##### 技术要点

1. 负责初期整体技术方案设计, 包括消息去重、消息合并、消息重发、消息补偿、会话管理、消息已读未读策略
2. 会话与消息数据管理使用基于发布订阅模式的响应式数据层设计，结合 localforage 实现持久化数据存储，并利用 rxjs 进行异步流管理。
3. 基于 mqtt 协议的长链接, 实现了 mqtt 连接管理、心跳、消息收发、topic 订阅等能力
4. IM 的数据消费, 采用 Provider 设计, 使用 useSyncExternalStore 进行数据同步
5. 配套的原子化 UIKit 组件包, 便于业务接入方按需引用与灵活定制

### 项目三：跳房子（Hybrid App）

##### 技术选型  

react-native、react-native-webview、vue3、vant、ts  

##### 项目背景  

主要负责该项目销售系统的研发迭代工作，提升销售人员电子合同签约和产品数据录入等工作的操作便捷性，提高了销售人员与运营人员的工作效率  

##### 技术要点

1. 项目中使用react-native进行原生应用的开发、webview嵌入h5的方式维护高频迭代更新的模块
2. 独自研发了基于vue3的配置化表单渲染引擎，提高表单场景研发效率40%
3. 抽象了一套基于webview的H5与RN通讯协议与事件机制，实现了高效率的数据通讯与原生api的调用策略
4. 推动项目ts迁移，增强api方法的统一类型定义，推动前后端传参规范
5. 独自推动并搭建了项目中的前端异常日志收集，与错误监控告警机制

### 项目四：SchemaForm（开源项目）

##### 技术选型  

async-validate、vue3、vant、ts、rollup、vitepress、pnpm  

##### 项目背景  

项目地址：<https://github.com/Muluk-m/schema-form>
SchemaForm 是一个声明式框架，它使用JSON Schema 定义的结构化数据模型作为输入，生成的一份具有数据绑定、数据校验、表单联动等能力的表单

##### 技术要点

1. 使用typescript编写项目内核，使其具有良好的类型提示
2. 基于async-validate搭建表单校验模块，抽象易用性高、拓展性强的表单校验配置
3. 使用rollup + esbuild插件进行cjs、esm文件的打包
4. 基于vitepress搭建文档站，编写github-flow 配置，实现文档站自动化 ci/cd

## 自我评价

1. 自学能力强,关注社区技术发展，有丰富的技术探索经验
2. 对前端技术有浓厚的兴趣,尝试维护自己的开源项目
3. 具有强烈的求知欲, 动手能力强
4. 总结规整能力强,经常书写踩坑指南、技术总结、项目复盘等
5. 沟通协作能力与责任心强,曾多次推动研发规范的治理工作

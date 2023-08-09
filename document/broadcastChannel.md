# BroadcastChannel

## 公众号文章

<https://mp.weixin.qq.com/s/OChbJt7pfvxh54Vp5H-IUQ>

## 技术原理

BroadcastChannel 接口代理了一个命名频道，可以让指定 origin 下的任意 browsing context 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象。

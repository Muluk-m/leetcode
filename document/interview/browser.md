# 浏览器考点

## 从输入url到浏览器解析发生了什么

[github](https://github.com/ljianshu/Blog/issues/24)
总体来说分为以下几个过程:

DNS 解析:将域名解析成 IP 地址
TCP 连接：TCP 三次握手
发送 HTTP 请求
服务器处理请求并返回 HTTP 报文
浏览器解析渲染页面
断开连接：TCP 四次挥手

# BOM 对象

## 窗口位置与像素比

### 1、窗口相对于屏幕和左侧的位置
`window.screenTop`
`window.screenLeft`

### 2.像素比
css像素是Web开发中使用的统一像素单位，这个单位背后其实是一个角度：`0.0213度`。
如果屏幕距离人眼是一臂长，则以这个角度计算的CSS像素大小约为`1/96`像素。
这样定义像素大小是为了在不同设备统一标准
例如：
比如手机的物理分辨率可能是 1920 x 1080，但因为其像素可能非常小，所以浏览器就需要将其分辨率降为降低的逻辑分辨率，比如640 x 320。
`物理像素与逻辑像素之间的缩放系数` 
由属性 `window.devicePixelRatio` 可以获取。 
例如 1920 x 1080 的转化为 640 x 320的设备，则 `window.devicePixelRatio` 的值为3。
这样 12（css像素）实际用36（物理像素来显示）

## 窗口大小
浏览器窗口大小
如果你需要获取除去滚动条和边框的窗口宽度，请使用根元素 <html>  的`clientWidth` 属性。
- `window.innerWidth`（不包含浏览器边框和工具栏）
- `window.innerHeight`（不包含浏览器边框和工具栏）
- `window.outerWidth`
- `window.outerHeight`

## 视口位置
边框到窗口的距离
- `window.scrollX`
- `window.pageXOffset` （返回文档/页面水平方向滚动的像素值)
- `window.scrollY` 
- `window.pageYOffset` （返回文档/页面垂直方向滚动的像素值）
pageXOffset 属性是 scrollX 属性的别名：
为了跨浏览器兼容性，请使用 window.pageXOffset 代替 window.scrollX

## 窗口滚动
滚动窗口至文档中的特定位置
- `window.scroll`
- `window.scrollTo` (同上，接收要滚动到x，y的位置)
- `window.scrollBy`（接收x、y要滚动的距离）
想要重复地滚动某个距离，请使用 window.scrollBy
也接收behavior参数，可以指定滚动的方式，可选值为`auto`（正常）、`smooth`（平滑的）、`instant`（立即）。
scrollTo({ x, y, behavior })

## 打开新窗口
const wroxWin = window.open(url, target, features)
可通过引用关闭窗口 wroxWin.close()
切断新标签页的通信 wroxWin.opener = null 
可通过 wroxWin === null 判定打开新窗口是否被屏蔽

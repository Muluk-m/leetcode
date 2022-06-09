# vue-cli build时 默认非生产环境不开启文件hash

### vue-cli 源码
```js
const isProd = process.env.NODE_ENV === 'production'
const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
const outputDir = api.resolve(options.outputDir)

const getAssetPath = require('../util/getAssetPath')
const outputFilename = getAssetPath(
  options,
  `js/[name]${isLegacyBundle ? `-legacy` : ``}${isProd && options.filenameHashing ? '.[contenthash:8]' : ''}.js`
)
webpackConfig
  .output
    .filename(outputFilename)
    .chunkFilename(outputFilename)
```

## 解决方案
因为vue-cli使用 css in js 策略所以不用处理css hash
```js
chainWebpack: config => {
  // 覆盖默认配置下dev环境打包文件不生成hash
  const outputFilename = 'assets/js/[name].[contenthash:8].js'
  config.output.filename(outputFilename).chunkFilename(outputFilename).end()
}
```

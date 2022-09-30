# 一些好的代码片段

## import(cdn) 懒加载cdn模块资源

```ts
const cache: { prettier: Promise<IPrettierModule> } = {
  prettier: null,
}

export const format = async (language: string, source: string) => {
  cache.prettier =
    cache.prettier ||
    new Function(
      `return import("${getNpmCDNRegistry()}/prettier@2.x/esm/standalone.mjs")`
    )()
  return cache.prettier.then((module) => {
    if (
      language === 'javascript.expression' ||
      language === 'typescript.expression'
    ) {
      return source
    }
    if (/(?:javascript|typescript)/gi.test(language)) {
      return module.default.format(source, {
        semi: false,
        parser(text) {
          return parse(text, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
          })
        },
      })
    }
    if (language === 'json') {
      return JSON.stringify(JSON.parse(source), null, 2)
    }
    return source
  })
}
```

1. 使用new Function() 实现构造函数执行异步动态加载cdn资源
2. cache.prettier = cache.prettier || ... 只加载一次

## each

```ts
export function each(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): void
export function each<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): void
export function each<T extends {}, TValue = T[keyof T]>(
  val: T,
  iterator: EachObjectIterator<TValue>,
  revert?: boolean
): void
export function each(val: any, iterator: any, revert?: boolean): void {
  if (isArr(val) || isStr(val)) {
    if (revert) {
      for (let i: number = val.length - 1; i >= 0; i--) {
        if (iterator(val[i], i) === false) {
          return
        }
      }
    } else {
      for (let i = 0; i < val.length; i++) {
        if (iterator(val[i], i) === false) {
          return
        }
      }
    }
  } else if (isObj(val)) {
    let key: string
    for (key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        if (iterator(val[key], key) === false) {
          return
        }
      }
    }
  }
}
```

1. each 函数重载
2. T extends {}  是否是对象类型
3. Object.hasOwnProperty.call(val, key) 对象是否存在键

### uid

```ts
let IDX = 36,
  HEX = ''
while (IDX--) HEX += IDX.toString(36)

export function uid(len?: number) {
  let str = '',
    num = len || 11
  while (num--) str += HEX[(Math.random() * 36) | 0]
  return str
}

```

### 判断类型

```ts
const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    obj != null &&
    (Array.isArray(type) ? type : [type]).some(
      (t) => getType(obj) === `[object ${t}]`
    )
```

### globalThisPolyfill

```js
function getGlobalThis() {
  try {
    if (typeof self !== 'undefined') {
      return self
    }
  } catch (e) {}
  try {
    if (typeof globalThisPolyfill !== 'undefined') {
      return globalThisPolyfill
    }
  } catch (e) {}
  try {
    if (typeof global !== 'undefined') {
      return global
    }
  } catch (e) {}
  return Function('return this')()
}
export const globalThisPolyfill: Window = getGlobalThis()

```

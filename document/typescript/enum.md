# 枚举类型

## 获取枚举值的字面量联合类型的小技巧

```ts
const enum ENUMS {
  VUE = 'vue',
  REACT = 'react',
  ANGULAR = 'angular'
}

type CODES = `${ENUMS}`
```

# 基于名字文本生成一个16进制表示的随机颜色

```ts
const generateHashColorByText = (text: string) => {
  const defaultColor = '#5161b4';

  if (!isStr(text) || !text) {
    return defaultColor;
  }

  const hash = text
    .split('')
    .reduce((res, cur) => res + cur.charCodeAt(0).toString(16), '');

  if (hash.length > 3) {
    return `#${hash.slice(1, 4)}`;
  }

  return defaultColor;
};
```

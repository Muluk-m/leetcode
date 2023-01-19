# string 类型

## string 类型 + 字面量联合类型

<https://github.com/microsoft/TypeScript/issues/29729>

```ts
type LiteralUnion<T extends U, U = string> = T | (U & {});
let x: LiteralUnion<"hello" | "world">;
x = "hey"; 
```

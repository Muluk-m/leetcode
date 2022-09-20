/**
 * 实现工具类型 A => B 的转化
 */

type A = {
  aa: string;
  Bb: string;
  Dc_Dd: {
    BB: string;
    Dd_Db_DA_DC: string;
  };
};

type B = {
  aa: string;
  bb: string;
  ccDd: {
    bb: string;
    ddDbDaDc: string;
  };
};

type Camel<T> = T extends unknown ? {
  [K in keyof T as CamelCase<K & string>]: T[K] extends Record<string, unknown>
  ? Camel<T[K]>
  : T[K]
} : never

type CamelCase<T extends string> = T extends `${infer L}_${infer R}`
  ? `${Lowercase<L>}${Capitalize<CamelCase<R>>}`
  : Lowercase<T>;

type C = Camel<A>

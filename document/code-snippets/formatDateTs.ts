type Separator = '-' | '/' | '.';

type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';

type Y = 'YYYY';

type M = 'MM';

type D = 'DD';

type CheckItem<T> = T extends Y
  ? `19${Num}${Num}` | `20${Num}${Num}`
  : T extends M
  ? `0${Num}` | '11' | '12'
  : T extends D
  ? `${'0' | '1' | '2'}${Num}` | '30' | '31'
  : never;

/**
 * FormatDate<'YYYY-MM-DD'> 1998-02-31
 */
type FormatDate<T> = T extends `${infer A}${Separator}${infer B}${Separator}${infer C}`
  ? T extends `${A}${infer Sep}${B}${infer _}${C}`
    ? `${CheckItem<A>}${Sep}${CheckItem<B>}${Sep}${CheckItem<C>}`
    : never
  : never;

const res: FormatDate<'YYYY-MM-DD'> = '2032-03-31';
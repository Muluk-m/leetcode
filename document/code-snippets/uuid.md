# UUID v4

```ts
/** Get's the global object for the current JavaScript runtime */
const GLOBAL_OBJ: InternalGlobal =
  (typeof globalThis == 'object' && isGlobalObj(globalThis)) ||
  // eslint-disable-next-line no-restricted-globals
  (typeof window == 'object' && isGlobalObj(window)) ||
  (typeof self == 'object' && isGlobalObj(self)) ||
  (typeof global == 'object' && isGlobalObj(global)) ||
  (function (this: any) {
    return this;
  })() ||
  {};

/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4(): string {
  const gbl = GLOBAL_OBJ as typeof GLOBAL_OBJ & CryptoGlobal;
  const crypto = gbl.crypto || gbl.msCrypto;

  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '');
  }

  const getRandomByte =
    crypto && crypto.getRandomValues ? () => crypto.getRandomValues(new Uint8Array(1))[0] : () => Math.random() * 16;

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  // Concatenating the following numbers as strings results in '10000000100040008000100000000000'
  return (([1e7] as unknown as string) + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line no-bitwise
    ((c as unknown as number) ^ ((getRandomByte() & 15) >> ((c as unknown as number) / 4))).toString(16),
  );
}

```

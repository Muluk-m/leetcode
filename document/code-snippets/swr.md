```ts
import useSwr, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type UnKlkResponse<T> = T extends KlkResponse<infer U> ? U : T;

/**
 * 包裹成 SWR hook
 * @link https://swr.vercel.app/zh-CN/docs/data-fetching
 */
export const wrappedWithSWR =
  <F extends (...arg: any) => Promise<KlkResponse<any>>, P = Parameters<F>[0]>(
    fn: F,
    options?: Parameters<typeof useSwr>[2],
  ) =>
  (params?: P, requestDeps?: (keyof P)[]) => {
    const deps = (requestDeps ?? [])
      .map((key) => params?.[key])
      .filter(Boolean);
    const isReady = !requestDeps ? true : !!deps.length && deps.every(Boolean);

    return useSwr(
      () => (isReady ? [fn.name, ...deps] : null),
      async () => {
        const { result, error, success } = await fn(params);

        return success
          ? (result as UnPromisify<ReturnType<F>>['result'])
          : Promise.reject(error);
      },
      options,
    );
  };

/**
 * 包裹成 SWRMutation hook
 * @link https://swr.vercel.app/zh-CN/docs/mutation
 */
export const wrappedWithSWRMutation =
  <
    F extends (...arg: any) => Promise<any>,
    P extends Record<string, any> = Parameters<F>[0],
    R = UnKlkResponse<UnPromisify<ReturnType<F>>>,
  >(
    fn: F,
    options?: Parameters<typeof useSWRMutation<R, any, any, P>>[2],
  ) =>
  () =>
    useSWRMutation(
      fn.name,
      async (_, { arg }) => {
        const { result, error, success } = await fn(arg);

        return success
          ? (result as UnPromisify<ReturnType<F>>['result'])
          : Promise.reject(error);
      },
      options,
    );
```

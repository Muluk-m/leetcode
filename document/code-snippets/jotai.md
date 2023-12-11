# useJotaiStore

```tsx
import React from 'react';
import {
  createStore,
  useStore,
  useAtomValue,
  Provider as JotaiProvider,
} from 'jotai';
import type { Atom } from 'jotai';

interface CreateAtomStoreOptions<
  T extends Record<string, Atom<any>>,
  N extends string,
> {
  store: ReturnType<typeof createStore>;
  atoms: T;
  name?: N;
}

type UseNameStore<N extends string = ''> = `use${Capitalize<N>}AtomStore`;
type NameStoreProvider<N extends string = ''> = `${Capitalize<N>}AtomProvider`;

const capitalizeFirstLetter = (str = '') =>
  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
const getStoreProviderIndex = (name = '') =>
  `${capitalizeFirstLetter(name)}AtomProvider`;
const getUseStoreIndex = (name = '') =>
  `use${capitalizeFirstLetter(name)}AtomStore`;

/**
 * 创建一个基于 Atom 的 store 管理器
 *
 * @example
 * const { useStoreValue, setStoreValue, atoms } = useTicketAtomStore()
 *
 * const curSessionId = useStoreValue(atoms.curSessionIdAtom);
 * setStoreValue(atoms.curSessionIdAtom, '1703718245535793152');
 */
export const createAtomStore = <
  T extends Record<string, Atom<any>>,
  N extends string,
>({
  store,
  atoms,
  name,
}: CreateAtomStoreOptions<T, N>) => {
  const storeProviderIndex = getStoreProviderIndex(name);
  const useStoreIndex = getUseStoreIndex(name);

  const useJotaiStore = () => {
    const { set, get, sub } = useStore({ store });
    const useStoreValue = useAtomValue;

    return {
      setStoreValue: set,
      subStoreValue: sub,
      getStoreValue: get,
      useStoreValue,
      atoms,
    };
  };

  const Provider: React.FC<React.PropsWithChildren> = ({ children }) =>
    React.createElement(JotaiProvider, { store }, children);

  return {
    [useStoreIndex as UseNameStore<N>]: useJotaiStore,
    [storeProviderIndex as NameStoreProvider<N>]: Provider,
  } as {
    [key in keyof Record<UseNameStore<N>, {}>]: typeof useJotaiStore;
  } & {
    [key in keyof Record<NameStoreProvider<N>, {}>]: typeof Provider;
  };
};

```

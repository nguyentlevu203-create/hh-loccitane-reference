import { readStorage, writeStorage } from "./storage";

/**
 * A tiny localStorage-backed external store, read via React's `useSyncExternalStore` (the
 * React-endorsed pattern for syncing state with a store outside React — see
 * https://react.dev/reference/react/useSyncExternalStore). This gives us three things the naive
 * "useState + useEffect(() => setState(readStorage(...)))" pattern doesn't:
 *   1. No "setState synchronously within an effect" lint violation (react-hooks/set-state-in-effect).
 *   2. A single source of truth shared by every component that reads it, with no Context Provider
 *      required — satisfies Phase 6's "cross-page synchronized frontend state" goal directly.
 *   3. Free cross-tab sync via the native `storage` event.
 */
export function createPersistedStore<T>(key: string, fallback: T) {
  let value: T = fallback;
  let hydrated = false;
  const listeners = new Set<() => void>();

  function hydrate() {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    value = readStorage(key, fallback);
  }

  function getSnapshot(): T {
    hydrate();
    return value;
  }

  function getServerSnapshot(): T {
    return fallback;
  }

  function subscribe(callback: () => void): () => void {
    hydrate();
    listeners.add(callback);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      value = readStorage(key, fallback);
      callback();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", onStorage);
    };
  }

  function setValue(updater: T | ((prev: T) => T)): void {
    value = typeof updater === "function" ? (updater as (prev: T) => T)(value) : updater;
    writeStorage(key, value);
    for (const listener of listeners) listener();
  }

  return { getSnapshot, getServerSnapshot, subscribe, setValue };
}

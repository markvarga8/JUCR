import { DependencyList, EffectCallback, useCallback, useEffect } from "react";

function useDebounceEffect(
  effect: EffectCallback,
  deps: DependencyList,
  delay: number = 500
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export default useDebounceEffect;

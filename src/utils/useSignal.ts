import { useEffect, useState } from "react";

export const useSignal = () => {
  const [signal, setSignal] = useState(0);
  const changeSignal = () => setSignal(signal + 1);

  return { signal, changeSignal };
};

export function useSignalListener<T extends [unknown]>(p: {
  signal: ReturnType<typeof useSignal>;
  value: T;
  onSignalChange: () => void;
  onValueChange: (x: T[0]) => void;
}) {
  const [firstSignalChange, setFirstSignalChange] = useState(true);
  const [firstValueChange, setFirstValueChange] = useState(true);

  useEffect(() => {
    if (!firstSignalChange) p.onSignalChange();
  }, [p.signal.signal]);

  useEffect(() => {
    if (!firstValueChange) p.onValueChange(p.value);
  }, [p.value]);

  useEffect(() => {
    setFirstSignalChange(false);
    setFirstValueChange(false);
  }, []);

  return { value: p.value };
}

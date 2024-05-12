import { useState } from "react";

export const useSignal = () => {
  const [signal, setSignal] = useState(0);
  const changeSignal = () => setSignal(signal + 1);

  return { signal, changeSignal };
};

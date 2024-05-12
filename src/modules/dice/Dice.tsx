import React, { useEffect, useState } from "react";
import { useSignal } from "@/utils/useSignal";

export type TDiceProps = {
  signal: ReturnType<typeof useSignal>;
  onChange: (p: number) => void;
};

export const Dice = (p: TDiceProps) => {
  const [value, setValue] = useState(0);

  const rollTheDice = () => setValue(Math.floor(Math.random() * 6));

  useEffect(() => rollTheDice(), [p.signal.signal]);
  useEffect(() => p.onChange(value), [value]);

  return (
    <div>
      <button onClick={rollTheDice}>roll the dice</button> {value}
    </div>
  );
};

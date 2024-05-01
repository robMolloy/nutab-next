import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

export type FlashMethods = {
  addFlash: () => void;
};

const FlashComponent = (_: unknown, ref: ForwardedRef<FlashMethods>) => {
  const [flashes, setFlashes] = useState<string[]>([]);
  const [finishedFlashes, setFinishedFlashes] = useState<string[]>([]);

  const addFlash = () => setFlashes((prevFlashes) => [...prevFlashes, uuid()]);

  const removeFlash = (x: string) =>
    setFinishedFlashes([...finishedFlashes, x]);

  useEffect(() => {
    console.log(123);

    (() => {
      if (flashes.length === 0) return;
      if (finishedFlashes.length === flashes.length) {
        setFlashes([]);
        setFinishedFlashes([]);
      }
    })();
  }, [finishedFlashes]);

  useImperativeHandle(ref, () => ({ addFlash }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {flashes
        .filter((flash) => !finishedFlashes.includes(flash))
        .map((x) => (
          <div
            key={x}
            onAnimationEndCapture={() => removeFlash(x)}
            style={{
              opacity: "0",
              position: "absolute",
              animation: "flashFade 1s",
              transition: "opacity 1s",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          />
        ))}
    </div>
  );
};

export const Flash = forwardRef<FlashMethods, {}>(FlashComponent);
Flash.displayName = "Flash";

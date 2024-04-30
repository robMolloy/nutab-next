import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

export type FlashMethods = {
  addFlash: () => void;
};

const FlashComponent = (_: unknown, ref: ForwardedRef<FlashMethods>) => {
  const [flashes, setFlashes] = useState<{ flashId: string }[]>([]);

  const addFlash = () => {
    setFlashes((prevFlashes) => [...prevFlashes, { flashId: uuid() }]);
  };
  const removeFlashById = (id: string) => {
    setFlashes((flashes) => flashes.filter((flash) => flash.flashId !== id));
  };

  useImperativeHandle(ref, () => ({ addFlash }));

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {flashes.map((x) => (
          <div
            key={x.flashId}
            onAnimationEndCapture={() => removeFlashById(x.flashId)}
            style={{
              position: "absolute",
              animation: "flashFade 1s",
              transition: "opacity 1s",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            flash
          </div>
        ))}
      </div>
    </>
  );
};

export const Flash = forwardRef<FlashMethods, {}>(FlashComponent);
Flash.displayName = "Flash";

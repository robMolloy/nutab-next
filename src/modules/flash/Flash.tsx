import { useSignal } from "@/utils/useSignal";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const Flash = (p: {
  signal: ReturnType<typeof useSignal>;
  children?: React.ReactNode;
}) => {
  const [firstRender, setFirstRender] = useState(true);
  const [flashes, setFlashes] = useState<string[]>([]);
  const [finishedFlashes, setFinishedFlashes] = useState<string[]>([]);

  const addFlash = () => setFlashes((prevFlashes) => [...prevFlashes, uuid()]);
  const removeFlash = (x: string) =>
    setFinishedFlashes([...finishedFlashes, x]);

  useEffect(() => {
    if (firstRender) return setFirstRender(false);

    addFlash();
  }, [p.signal.signal]);

  useEffect(() => {
    if (flashes.length === 0) return;
    if (finishedFlashes.length === flashes.length) {
      setFlashes([]);
      setFinishedFlashes([]);
    }
  }, [finishedFlashes]);

  return (
    <>
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
              zIndex: 99,
            }}
          />
        ))}
      {p.children}
    </>
  );
};

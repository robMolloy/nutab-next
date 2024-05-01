import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

type TFlashSignal = number;
export const useFlash = () => {
  const [flashSignal, setFlashSignal] = useState<TFlashSignal>(0);
  const flash = () => setFlashSignal(Math.random());

  return { flash, flashSignal };
};

export const Flash = (p: { flashSignal: TFlashSignal }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [flashes, setFlashes] = useState<string[]>([]);
  const [finishedFlashes, setFinishedFlashes] = useState<string[]>([]);

  const addFlash = () => setFlashes((prevFlashes) => [...prevFlashes, uuid()]);
  const removeFlash = (x: string) =>
    setFinishedFlashes([...finishedFlashes, x]);

  useEffect(() => {
    if (firstRender) return setFirstRender(false);

    addFlash();
  }, [p.flashSignal]);

  useEffect(() => {
    if (flashes.length === 0) return;
    if (finishedFlashes.length === flashes.length) {
      setFlashes([]);
      setFinishedFlashes([]);
    }
  }, [finishedFlashes]);

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

import { Button } from "@/components";
import { Input } from "@/components/inputs/Input";
import { Select } from "@/components/select/Select";
import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import { useState } from "react";

export const VideoStreamControls = () => {
  const store = useVideoStreamDimensionsStore();

  const [width, setWidth] = useState(store.width);
  const [aspectRatio, setAspectRatio] = useState(store.aspectRatio);

  const isChanged = () =>
    width !== store.width || aspectRatio !== store.aspectRatio;

  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <Input
          label="Width"
          type="number"
          value={width}
          onInput={(x) => setWidth(x)}
        />

        <Select
          label="Aspect Ratio"
          value={aspectRatio}
          options={store.aspectRatios.map((x) => {
            return { label: `width: ${x[0]}, height: ${x[1]}, `, value: x };
          })}
          onChange={(x) => setAspectRatio(x)}
        />
        <div className="flex flex-col gap-1 items-center">
          <div className={`text-warning "" ${isChanged() ? "" : "opacity-0"}`}>
            hit the save button to confirm your changes
          </div>
          <Button
            variant="primary"
            wide
            onClick={() => store.set({ width, aspectRatio })}
          >
            Save changes
          </Button>
        </div>
      </div>
      <br />
      <br />
      width: {store.width}
      <br />
      height: {store.height}
      <br />
      aspectRatio: {JSON.stringify(store.aspectRatio)}
    </div>
  );
};

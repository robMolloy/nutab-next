import { useSignal } from "@/utils/useSignal";
import { Flash } from "..";
import { DumbVideoStream } from ".";
import {
  VideoStreamContainer,
  VideoStreamContainerItem,
} from "./VideoStreamContainer";
import { useEffect } from "react";

export const VideoStream = (p: {
  signal: ReturnType<typeof useSignal>;
  onCapture: React.ComponentProps<typeof DumbVideoStream>["onCapture"];
  className: HTMLDivElement["className"];
}) => {
  const flashSignal = useSignal();
  const captureSignal = useSignal();

  useEffect(() => {
    flashSignal.changeSignal();
    captureSignal.changeSignal();
  }, [p.signal.signal]);

  return (
    <VideoStreamContainer>
      <VideoStreamContainerItem>
        <Flash signal={flashSignal} />
      </VideoStreamContainerItem>
      <VideoStreamContainerItem>
        <DumbVideoStream signal={captureSignal} onCapture={p.onCapture} />
      </VideoStreamContainerItem>
    </VideoStreamContainer>
  );
};

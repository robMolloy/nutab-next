import { useSignal, useSignalListener } from "@/utils/useSignal";
import { DumbVideoStream } from ".";
import { Flash } from "..";
import {
  VideoStreamContainer,
  VideoStreamContainerItem,
} from "./VideoStreamContainer";

export const VideoStream = (p: {
  signal: ReturnType<typeof useSignal>;
  onCapture: React.ComponentProps<typeof DumbVideoStream>["onCapture"];
  className?: HTMLDivElement["className"];
  onClick?: () => void;
  showVideo?: boolean;
}) => {
  const { showVideo = true } = p;
  const flashSignal = useSignal();
  const captureSignal = useSignal();
  useSignalListener({
    signal: p.signal,
    onSignalChange: () => {
      flashSignal.changeSignal();
      captureSignal.changeSignal();
    },
  });

  return (
    <VideoStreamContainer className={p.className} onClick={p.onClick}>
      <VideoStreamContainerItem>
        <Flash signal={flashSignal} />
      </VideoStreamContainerItem>
      {showVideo && (
        <VideoStreamContainerItem>
          <DumbVideoStream signal={captureSignal} onCapture={p.onCapture} />
        </VideoStreamContainerItem>
      )}
    </VideoStreamContainer>
  );
};

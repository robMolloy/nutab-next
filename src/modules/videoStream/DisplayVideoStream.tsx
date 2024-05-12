import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import { VideoHTMLAttributes, useEffect, useRef, useState } from "react";
import {
  checkVideoStream,
  displayVideoStream,
  safeGetVideoStream,
  stopVideoStream,
} from ".";
import { useSignal } from "@/utils/useSignal";

type THTMLVideoElement = VideoHTMLAttributes<HTMLVideoElement>;

export type TDisplayVideoStreamProps = THTMLVideoElement & {
  className: THTMLVideoElement["className"];
  onCapture: () => void;
  signal: ReturnType<typeof useSignal>;
};

export const DisplayVideoStream = (p: TDisplayVideoStreamProps) => {
  const { className, style, ...other } = p;
  const store = useVideoStreamDimensionsStore();

  const videoElmRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | undefined>(
    undefined
  );

  const init = async () => {
    if (videoStream) stopVideoStream(videoStream);

    const videoStreamResponse = await safeGetVideoStream({
      aspectRatio: store.aspectRatio,
      idealWidth: store.width,
    });
    if (!videoElmRef.current || !videoStreamResponse.success) return;
    setVideoStream(videoStreamResponse.data);

    displayVideoStream({
      videoElm: videoElmRef.current,
      videoStream: videoStreamResponse.data,
    });

    const checkVideoStreamResponse = checkVideoStream({
      videoStream: videoStreamResponse.data,
      idealDimensions: { width: store.width, height: store.height },
    });
    if (!checkVideoStreamResponse.success)
      console.error(checkVideoStreamResponse.error);
  };

  useEffect(() => {
    init();
  }, [store.aspectRatio, store.width]);

  return (
    <video
      ref={videoElmRef}
      autoPlay
      style={{
        height: "inherit",
        width: "inherit",
        ...style,
      }}
      className={`absolute transform scale-x-[-1]  ${className}`}
      {...other}
    />
  );
};

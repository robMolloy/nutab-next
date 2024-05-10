import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import { useEffect, useRef, useState } from "react";
import {
  checkVideoStream,
  displayVideoStream,
  safeGetVideoStream,
  stopVideoStream,
} from ".";

// type HTMLVideoElement = DetailedHTMLProps<
//   VideoHTMLAttributes<HTMLVideoElement>,
//   HTMLVideoElement
// >;

export type TDisplayVideoStreamProps = {
  className: HTMLVideoElement["className"];
};

export const DisplayVideoStream = (p: TDisplayVideoStreamProps) => {
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
        position: "absolute",
        transform: "scaleX(-1)",
        height: "inherit",
        width: "inherit",
      }}
      className={p.className}
    />
  );
};

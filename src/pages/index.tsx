import { Button } from "@/components";
import { VideoStream } from "@/modules/videoStream/VideoStream";
import {
  VideoStreamContainer,
  VideoStreamContainerItem,
} from "@/modules/videoStream/VideoStreamContainer";
import { useSignal } from "@/utils/useSignal";
import { useState } from "react";

// @State() status:
//     | 'loading'
//     | 'preReady'
//     | 'ready'
//     | 'capturing'
//     | 'selecting'
//     | 'sending'
//     | 'fail'
//     | 'success' = 'loading';

const useFlow = () => {
  const [showVideoStream, setShowVideoStream] = useState(true);
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();

  const status = (() => {
    if (imageDataUrl) return "selecting";
    return "capturing";
  })();

  return {
    status,
    showVideoStream,
    setShowVideoStream,
    imageDataUrl,
    setImageDataUrl,
  };
};

const Parent = () => {
  const signal = useSignal();
  const { status, imageDataUrl, setImageDataUrl } = useFlow();

  return (
    <main className={`min-h-screen`}>
      <Button variant="primary">Click me</Button>

      <pre>{JSON.stringify({ status, imageDataUrl }, undefined, 2)}</pre>

      <div className="flex justify-center items-center">
        <VideoStreamContainer>
          {(status === "capturing" || status === "selecting") && (
            <VideoStreamContainerItem>
              <VideoStream
                signal={signal}
                onCapture={(x) => setImageDataUrl(x)}
                onClick={() => signal.changeSignal()}
                showVideo={!imageDataUrl}
              />
            </VideoStreamContainerItem>
          )}
          {status === "selecting" && (
            <VideoStreamContainerItem>
              <div
                className={`flex w-full h-full`}
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url('${imageDataUrl}`,
                }}
              />
            </VideoStreamContainerItem>
          )}
        </VideoStreamContainer>
      </div>
    </main>
  );
};

export default Parent;

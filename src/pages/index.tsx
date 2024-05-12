import { Flash } from "@/modules";
import { DumbVideoStream } from "@/modules/videoStream";
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
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();

  const flashSignal = useSignal();
  const captureSignal = useSignal();

  const capture = () => {
    flashSignal.changeSignal();
    captureSignal.changeSignal();
  };

  const status = (() => {
    if (imageDataUrl) return "selecting";
    return "capturing";
  })();

  return {
    status,
    imageDataUrl,
    setImageDataUrl,
    flashSignal,
    captureSignal,
    capture,
  };
};

const Parent = () => {
  const {
    status,
    imageDataUrl,
    setImageDataUrl,
    flashSignal,
    captureSignal,
    capture,
  } = useFlow();

  return (
    <main className={`min-h-screen`} onClick={() => capture()}>
      <pre>{JSON.stringify({ status, imageDataUrl }, undefined, 2)}</pre>

      <div className="flex justify-center items-center">
        <VideoStreamContainer>
          {(status === "capturing" || status === "selecting") && (
            <VideoStreamContainerItem>
              <Flash signal={flashSignal} />
            </VideoStreamContainerItem>
          )}
          {status === "capturing" && (
            <VideoStreamContainerItem>
              <DumbVideoStream
                signal={captureSignal}
                onCapture={(x) => setImageDataUrl(x)}
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

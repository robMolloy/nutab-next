import { Button } from "@/components";
import { Flash } from "@/modules";
import { DumbVideoStream } from "@/modules/videoStream";
import {
  VideoStreamContainer,
  VideoStreamContainerItem,
} from "@/modules/videoStream/VideoStreamContainer";
import { useSignal } from "@/utils/useSignal";
import { useState } from "react";

const delay = async (x: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), x);
  });
};

type TFlowStatus =
  | "capturing"
  | "ready"
  | "selecting"
  | "sending"
  | "fail"
  | "success";

const useFlow = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();

  const flashSignal = useSignal();
  const captureSignal = useSignal();

  const capture = () => {
    flashSignal.changeSignal();
    captureSignal.changeSignal();
  };

  const [status, setStatus] = useState<TFlowStatus>("capturing");

  return {
    status,
    setStatus,
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
    setStatus,
    imageDataUrl,
    setImageDataUrl,
    flashSignal,
    captureSignal,
    capture,
  } = useFlow();

  return (
    <main
      className={`min-h-screen`}
      onClick={() => {
        if (status !== "capturing") return;
        capture();
        setStatus("selecting");
      }}
    >
      <br />
      <div className="prose w-full m-auto">
        <h2 className="text-center">
          {status === "capturing" && "Tap anywhere to take photo"}
          {status === "selecting" && "Select photo or discard"}
          {status === "sending" && "Please wait..."}
          {status === "fail" && "Something has gone wrong, please try again"}
          {status === "success" && "Success! Please return the device"}
        </h2>
      </div>
      <br />

      <div className="flex justify-center items-center">
        <VideoStreamContainer>
          {(status === "capturing" || status === "selecting") && (
            <VideoStreamContainerItem>
              <Flash signal={flashSignal} />
            </VideoStreamContainerItem>
          )}
          {(status === "capturing" || status === "selecting") && (
            <VideoStreamContainerItem>
              <DumbVideoStream
                signal={captureSignal}
                onCapture={(x) => setImageDataUrl(x)}
                className={`${status === "selecting" ? "invisible" : ""}`}
              />
            </VideoStreamContainerItem>
          )}
          {(status === "selecting" || status === "sending") && (
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
          {status === "sending" && (
            <VideoStreamContainerItem>
              <div
                className={`flex w-full h-full justify-center items-center bg-gray-400 opacity-60`}
              >
                <span className="loading loading-spinner loading-lg" />
              </div>
            </VideoStreamContainerItem>
          )}
          {status === "fail" && (
            <VideoStreamContainerItem>
              <div className="flex justify-center w-full h-full items-center">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="error"
                    onClick={async () => setStatus("selecting")}
                  >
                    Try again
                  </Button>
                </div>
              </div>
            </VideoStreamContainerItem>
          )}
          {status === "success" && (
            <VideoStreamContainerItem>
              <div className="flex justify-center w-full h-full items-center">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    outline
                    onClick={async () => setStatus("capturing")}
                  >
                    Start again
                  </Button>
                </div>
              </div>
            </VideoStreamContainerItem>
          )}
        </VideoStreamContainer>
      </div>
      <br />
      {status === "selecting" && (
        <div className="flex justify-center gap-2">
          <Button
            variant="primary"
            onClick={async () => {
              setStatus("sending");
              await delay(1000);
              setStatus(Math.random() > 0.3 ? "success" : "fail");
            }}
          >
            Select
          </Button>
          <Button
            variant="ghost"
            outline
            onClick={() => {
              setImageDataUrl(undefined);
              setStatus("capturing");
            }}
          >
            Discard
          </Button>
        </div>
      )}
    </main>
  );
};

export default Parent;

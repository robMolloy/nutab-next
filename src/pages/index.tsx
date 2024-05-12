import { Button } from "@/components";
import { VideoStreamControls } from "@/modules/videoStream";
import { VideoStream } from "@/modules/videoStream/VideoStream";
import { VideoStreamContainer } from "@/modules/videoStream/VideoStreamContainer";
import { useSignal } from "@/utils/useSignal";
import { useState } from "react";

const Parent = () => {
  const [showVideoStream, setShowVideoStream] = useState(true);
  const signal = useSignal();

  return (
    <main className={`min-h-screen`}>
      <Button variant="primary" onClick={() => signal.changeSignal()}>
        Click me
      </Button>
      <VideoStreamContainer>
        <div className={`${showVideoStream ? "hidden" : ""}`}>hiya</div>
        <VideoStream
          className={`${showVideoStream ? "hidden" : ""}`}
          signal={signal}
          onCapture={(x) => {
            console.log({ x });
          }}
        />
      </VideoStreamContainer>

      <Button
        variant="primary"
        onClick={() => setShowVideoStream(!showVideoStream)}
      >
        show/hide
      </Button>
      <VideoStreamControls />
      <br />
    </main>
  );
};

export default Parent;

import { Button } from "@/components";
import { Flash } from "@/modules";
import { DisplayVideoStream, VideoStreamControls } from "@/modules/videoStream";
import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import { useSignal } from "@/utils/useSignal";
import { useState } from "react";

const Parent = () => {
  const flashSignal = useSignal();
  const signal = useSignal();

  const [showVideoStream, setShowVideoStream] = useState(true);
  const store = useVideoStreamDimensionsStore();

  return (
    <main className={`min-h-screen`}>
      <Button variant="primary" onClick={() => flashSignal.changeSignal()}>
        Click me
      </Button>
      <div className="flex items-center justify-center">
        <div
          className={`h-[40vh] relative`}
          style={{
            width: `${40 * store.calculateRatio()}vh`,
          }}
        >
          <div
            data-showvideostream={showVideoStream}
            className={`absolute w-full h-full flex justify-center items-center data-[showvideostream=true]:invisible px-4`}
          >
            <div>
              Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
              Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
              Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
              Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
              Hello Hello Hello
            </div>
          </div>
          <DisplayVideoStream
            data-showvideostream={showVideoStream}
            className="data-[showvideostream=false]:invisible"
            signal={signal}
            onCapture={() => {}}
          />
          <Flash signal={flashSignal} />
        </div>
      </div>
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

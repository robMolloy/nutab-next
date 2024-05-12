import { Button } from "@/components";
// import { VideoStreamControls } from "@/modules/videoStream";
// import { VideoStream } from "@/modules/videoStream/VideoStream";
// import {
//   VideoStreamContainer,
//   VideoStreamContainerItem,
// } from "@/modules/videoStream/VideoStreamContainer";
// import { useState } from "react";
import { useSignal } from "@/utils/useSignal";
import { Dice } from "@/modules/dice";
import { useState } from "react";

const Parent = () => {
  // const [showVideoStream, setShowVideoStream] = useState(true);
  const signal = useSignal();
  const [count, setCount] = useState(0);

  return (
    <main className={`min-h-screen`}>
      <Button
        variant="primary"
        onClick={() => {
          setCount(count + 1);
          signal.changeSignal();
        }}
      >
        Click me
      </Button>
      <div>{count}</div>
      <Dice
        signal={signal}
        onChange={(x) => {
          console.log(x);
        }}
      />
      {/* <VideoStreamContainer>
        <VideoStreamContainerItem>
          <div
            className={`flex align-middle justify-center w-full h-full ${
              showVideoStream ? "hidden" : ""
            }`}
          >
            <div>hiya</div>
          </div>
        </VideoStreamContainerItem>
        <VideoStreamContainerItem>
          <VideoStream
            className={`${showVideoStream ? "" : "hidden"}`}
            signal={signal}
            onCapture={(x) => console.log({ x })}
          />
        </VideoStreamContainerItem>
      </VideoStreamContainer> */}

      {/* <Button
        variant="primary"
        onClick={() => setShowVideoStream(!showVideoStream)}
      >
        show/hide
      </Button>
      <VideoStreamControls /> */}
      <br />
    </main>
  );
};

export default Parent;

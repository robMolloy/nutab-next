import { Button } from "@/components";
import { Flash, useFlash } from "@/modules";
import { DisplayVideoStream, VideoStreamControls } from "@/modules/videoStream";
import { useState } from "react";

const Parent = () => {
  const flash = useFlash();

  const [show, setShow] = useState(true);

  return (
    <main className={`min-h-screen`}>
      <Button variant="primary" onClick={() => flash.flash()}>
        Click me
      </Button>
      <div className="h-[40vh] w-full relative">
        <DisplayVideoStream className={show ? "" : "invisible"} />
        <Flash flashSignal={flash.flashSignal} />
        <div className="absolute w-full h-full flex justify-center items-center">
          <div>asd</div>
        </div>
      </div>
      <Button variant="primary" onClick={() => setShow(!show)}>
        show/hide
      </Button>
      <VideoStreamControls />
      <br />
    </main>
  );
};

export default Parent;

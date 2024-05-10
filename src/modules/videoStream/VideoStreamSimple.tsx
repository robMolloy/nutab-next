import { useEffect, useRef } from "react";

export const getVideoStream = () =>
  navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: 400 }, height: { ideal: 400 } },
  });
export const VideoStreamSimple = () => {
  const pRef = useRef<HTMLVideoElement>(null);

  const start = async () => {
    if (!pRef.current) return;

    const videoStream = await getVideoStream();
    pRef.current.srcObject = videoStream;
  };

  useEffect(() => {
    console.log(pRef.current);
    start();
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <video ref={pRef} autoPlay></video>
    </div>
  );
};

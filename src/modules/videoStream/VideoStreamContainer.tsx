import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import React from "react";

export type TVideoStreamContainerProps = {
  children: React.ReactNode;
};

export const VideoStreamContainer = (p: TVideoStreamContainerProps) => {
  const store = useVideoStreamDimensionsStore();

  return (
    <div
      className={`relative h-[40vh]`}
      style={{ width: `${40 * store.calculateRatio()}vh` }}
    >
      {p.children}
    </div>
  );
};

export const VideoStreamContainerItem = (p: { children: React.ReactNode }) => {
  return <div className="absolute flex h-full w-full">{p.children}</div>;
};

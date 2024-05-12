import { useVideoStreamDimensionsStore } from "@/stores/useVideoStreamDimensionsStore";
import React from "react";

export type TVideoStreamContainerProps = {
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
};

export const VideoStreamContainer = (p: TVideoStreamContainerProps) => {
  const store = useVideoStreamDimensionsStore();

  return (
    <div
      className={`relative h-[40vh] ${p.className}`}
      style={{ width: `${40 * store.calculateRatio()}vh` }}
    >
      {p.children}
    </div>
  );
};

export const VideoStreamContainerItem = (p: { children: React.ReactNode }) => {
  return <div className="absolute flex h-full w-full">{p.children}</div>;
};

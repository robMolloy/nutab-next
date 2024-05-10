import { TAspectRatio } from "@/stores/useVideoStreamDimensionsStore";

export const getVideoStream = async (p: {
  aspectRatio: TAspectRatio;
  idealWidth: number;
}) => {
  const constraints = {
    video: {
      width: { ideal: p.idealWidth },
      height: { ideal: p.idealWidth / (p.aspectRatio[0] / p.aspectRatio[1]) },
    },
  };
  return navigator.mediaDevices.getUserMedia(constraints);
};

export const safeGetVideoStream = async (
  p: Parameters<typeof getVideoStream>[0]
) => {
  try {
    return { success: true, data: await getVideoStream(p) } as const;
  } catch (e) {
    const { message, name } = e as Error;
    return { success: false, error: { message, name } } as const;
  }
};

export const displayVideoStream = (p: {
  videoElm: HTMLVideoElement;
  videoStream: MediaStream;
}) => {
  p.videoElm.srcObject = p.videoStream;
};
export const stopVideoStream = (p: MediaStream) => {
  p.getTracks().forEach((track) => track.stop());
};

export const getVideoStreamSettings = (p: MediaStream) => {
  const mediaStreamTrack = p.getTracks().find((x) => !!x);
  if (mediaStreamTrack) return mediaStreamTrack.getSettings();
};

export const checkVideoStream = (p: {
  videoStream: MediaStream;
  idealDimensions: { width: number; height: number };
}) => {
  const videoStreamSettings = getVideoStreamSettings(p.videoStream);
  console.log(videoStreamSettings);

  const height = videoStreamSettings?.height;
  const width = videoStreamSettings?.width;
  console.log({ ideal: p.idealDimensions, actual: { width, height } });

  if (!width || !height)
    return {
      success: false,
      error: {
        message: `seems like the height or width of the videoStream isn't set; width: ${width}, height: ${height}`,
      },
    } as const;

  const heightRatio = height / p.idealDimensions.height;
  const widthRatio = width / p.idealDimensions.width;

  if (heightRatio < 0.95 || heightRatio > 1.05)
    return {
      success: false,
      error: {
        message: `seems like there's a mismatch between the ideal height and the actual height; ideal:${p.idealDimensions.height}, actual: ${height}`,
      },
    } as const;
  if (widthRatio < 0.95 || widthRatio > 1.05)
    return {
      success: false,
      error: {
        message: `seems like there's a mismatch between the ideal width and the actual width; ideal:${p.idealDimensions.height}, actual: ${height}`,
      },
    } as const;

  return { success: true } as const;
};

export const checkVideoElement = (p: {
  videoElement: HTMLVideoElement;
  idealDimensions: { width: number; height: number };
}) => {
  const { height, width } = p.videoElement.getBoundingClientRect();
  console.log({ ideal: p.idealDimensions, actual: { width, height } });

  if (!width || !height)
    return {
      success: false,
      error: {
        message: `seems like the height or width of the videoStream isn't set; width: ${width}, height: ${height}`,
      },
    } as const;

  const heightRatio = height / p.idealDimensions.height;
  const widthRatio = width / p.idealDimensions.width;

  if (heightRatio < 0.95 || heightRatio > 1.05)
    return {
      success: false,
      error: {
        message: `seems like there's a mismatch between the ideal height and the actual height; ideal:${p.idealDimensions.height}, actual: ${height}`,
      },
    } as const;
  if (widthRatio < 0.95 || widthRatio > 1.05)
    return {
      success: false,
      error: {
        message: `seems like there's a mismatch between the ideal width and the actual width; ideal:${p.idealDimensions.height}, actual: ${height}`,
      },
    } as const;

  return { success: true } as const;
};

const getVideoStream = async (p: {
  aspectRatio: number;
  idealWidth: number;
}) => {
  const constraints = {
    video: {
      width: { ideal: p.idealWidth },
      height: { ideal: p.idealWidth / p.aspectRatio },
    },
  };

  const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

  const mediaStreamTrack = mediaStream.getVideoTracks().find((x) => !!x);

  if (!mediaStreamTrack) return;

  const mediaStreamTrackSettings = mediaStreamTrack.getSettings();

  const wMax = mediaStreamTrackSettings.width;
  const hMax = mediaStreamTrackSettings.height;
};

import { useEffect, useRef } from 'react';

interface Props {
  mp4Url: string;
}

export default function PlayerWindow({ mp4Url }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const enterFs = () => {
    const el = videoRef.current;
    if (el && el.requestFullscreen) el.requestFullscreen();
  };

  useEffect(() => {
    videoRef.current?.play();
  }, [mp4Url]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      <video ref={videoRef} src={mp4Url} loop muted className="w-full h-full" />
      <button onClick={enterFs} className="mt-2 bg-blue-600 text-white px-4 py-1">
        Pełny ekran
      </button>
    </div>
  );
}

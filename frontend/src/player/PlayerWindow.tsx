import { useEffect, useRef, useState } from 'react';

interface Props {
  mp4Url: string;
}

export default function PlayerWindow({ mp4Url }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        video.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const enterFs = () => {
    const el = videoRef.current;
    if (el && el.requestFullscreen) el.requestFullscreen();
  };

  useEffect(() => {
    videoRef.current?.play();
  }, [mp4Url]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black relative group">
      <video ref={videoRef} src={mp4Url} loop muted className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={togglePlay} className="text-white">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        <button onClick={enterFs} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

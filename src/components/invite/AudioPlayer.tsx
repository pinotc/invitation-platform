"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export const AudioPlayer = ({ src, isOpened }: { src?: string; isOpened: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Khi phong bì mở (isOpened = true), bắt đầu phát nhạc
    if (isOpened && src && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Trình duyệt chặn autoplay", e));
    }
  }, [isOpened, src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button 
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-lg text-slate-700 hover:text-sky-500 hover:bg-white transition-all"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5 animate-pulse" />}
      </button>
    </>
  );
};
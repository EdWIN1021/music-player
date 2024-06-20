"use client";

import { MusicContext } from "@/music-provider";
import React, { useContext, useEffect, useRef, useState } from "react";

interface AudioProps {
  fileNames: string[];
}

const Audio: React.FC<AudioProps> = ({ fileNames }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, trackIndex, setTrackIndex } =
    useContext(MusicContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.load();
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [trackIndex, isPlaying]);

  const handleEnded = () => {
    setTrackIndex((prev) => (prev + 1) % fileNames.length);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="hidden">
      {fileNames.length > 0 && (
        <>
          <audio controls ref={audioRef} preload="none" onEnded={handleEnded}>
            <source
              src={`music/${fileNames[trackIndex]}.mp3`}
              type="audio/mp3"
            />
          </audio>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}
    </div>
  );
};

export default Audio;

"use client";

import React, { useEffect, useRef, useState } from "react";

interface AudioProps {
  fileNames: string[];
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Audio: React.FC<AudioProps> = ({
  fileNames,
  trackIndex,
  setTrackIndex,
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

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

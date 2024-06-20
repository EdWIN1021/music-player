"use client";

import React, { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  fileNames: string[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ fileNames }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div>
      {fileNames.length > 0 && (
        <>
          <audio controls ref={audioRef} preload="none" onEnded={handleEnded}>
            <source src={`music/${fileNames[trackIndex]}`} type="audio/mp3" />
          </audio>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;

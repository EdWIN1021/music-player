"use client";

import React, { useState } from "react";
import PlayList from "./play-list";
import Audio from "./audio";
import MusicController from "./music-controller";

interface MusicPlayerProps {
  fileNames: string[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ fileNames }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-[100vh]">
      <PlayList
        fileNames={fileNames}
        setTrackIndex={setTrackIndex}
        setIsPlaying={setIsPlaying}
      />
      <Audio
        fileNames={fileNames}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <MusicController />
    </div>
  );
};

export default MusicPlayer;

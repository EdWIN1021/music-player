"use client";

import React, { useState } from "react";
import PlayList from "./play-list";
import Audio from "./audio";

interface MusicPlayerProps {
  fileNames: string[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ fileNames }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
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
    </div>
  );
};

export default MusicPlayer;

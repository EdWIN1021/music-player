"use client";

import React from "react";
import MusicContainer from "@/components/music-container";

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  return <MusicContainer songs={songs} />;
};

export default MusicPlayer;

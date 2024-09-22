"use client";

import React from "react";
import Container from "./Container";

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  return <Container songs={songs} />;
};

export default MusicPlayer;

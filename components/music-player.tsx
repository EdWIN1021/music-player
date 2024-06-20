"use client";

import React, { useState } from "react";
import PlayList from "./play-list";
import Audio from "./audio";
import MusicController from "./music-controller";
import { Separator } from "./ui/separator";

interface MusicPlayerProps {
  fileNames: string[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ fileNames }) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <PlayList fileNames={fileNames} />

      <Audio fileNames={fileNames} />

      <Separator />
      <MusicController />
    </div>
  );
};

export default MusicPlayer;

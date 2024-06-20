"use client";

import React, { useState } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import { Separator } from "./ui/separator";

interface MusicPlayerProps {
  fileNames: string[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ fileNames }) => {
  return (
    <div className="flex flex-col max-h-[100vh]">
      <PlayList fileNames={fileNames} />
      <Separator />
      <MusicController fileNames={fileNames} />
    </div>
  );
};

export default MusicPlayer;

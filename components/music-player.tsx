"use client";

import React, { useState } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import { Separator } from "./ui/separator";

interface MusicPlayerProps {
  songs: Song[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  return (
    <>
      {/*  "https://api.github.com/repos/EdWIN1021/muisc/contents" */}

      <div className="flex flex-col overflow-hidden">
        <PlayList songs={songs} />
        <MusicController songs={songs} />
      </div>
    </>
  );
};

export default MusicPlayer;

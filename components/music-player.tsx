"use client";

import React, { useEffect, useState } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import Config from "./config";

interface MusicPlayerProps {
  songs: Song[];
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const config = localStorage.getItem("config");
    if (config) setConfig(JSON.parse(config));
  }, []);

  return (
    <>
      {/*  "https://api.github.com/repos/EdWIN1021/muisc/contents" */}

      {config ? (
        <div className="flex flex-col overflow-hidden">
          <PlayList songs={songs} />
          <MusicController songs={songs} />
        </div>
      ) : (
        <Config />
      )}
    </>
  );
};

export default MusicPlayer;

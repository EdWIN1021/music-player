"use client";

import React, { useContext, useMemo } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import { MusicContext } from "@/music-provider";

interface ContainerProps {
  songs: Song[];
}

const MusicContainer: React.FC<ContainerProps> = ({ songs }) => {
  const { search } = useContext(MusicContext);
  const playList = useMemo(() => {
    const arr: Song[] = [];
    songs?.forEach((song) => {
      song.name.includes(search) && arr.push(song);
    });
    return arr;
  }, [search, songs]);

  return (
    <div className="flex flex-col overflow-hidden">
      <PlayList songs={playList} />
      <MusicController songs={playList} />
    </div>
  );
};

export default MusicContainer;

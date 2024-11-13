"use client";

import React, { useContext, useMemo, useState } from "react";
import PlayList from "./play-list";
import MusicController from "./music-controller";
import { MusicContext } from "@/music-provider";
import { useQuery } from "@tanstack/react-query";
import Modes from "./modes";

const fetchSongs = async (mode: string) => {
  const response = await fetch(
    `https://api.github.com/repos/EdWIN1021/music-player/contents/music/${mode}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

const MusicPlayer = () => {
  const { search } = useContext(MusicContext);

  const [mode, setMode] = useState("normal");

  const { data: songs } = useQuery({
    queryKey: ["songs", mode],
    queryFn: () => fetchSongs(mode),
  });

  const playList = useMemo(() => {
    const arr: Song[] = [];
    songs?.forEach((song: Song) => {
      song.name.includes(search) && arr.push(song);
    });
    return arr;
  }, [search, songs]);

  return (
    <>
      <Modes mode={mode} setMode={setMode} />
      <div className="flex flex-col overflow-hidden">
        <PlayList songs={playList} />
        <MusicController songs={playList} />
      </div>
    </>
  );
};

export default MusicPlayer;

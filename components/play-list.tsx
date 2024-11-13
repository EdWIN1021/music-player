"use client";

import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MusicContext } from "@/music-provider";
// import SongOptions from "./song-options";

interface PlayListProps {
  songs: Song[];
}

const PlayList: FC<PlayListProps> = ({ songs }) => {
  const { setIsPlaying, setTrackIndex, setCurrentSong } =
    useContext(MusicContext);

  const handleClick = (index: number, song: Song) => {
    setIsPlaying(true);
    setTrackIndex(index);
    setCurrentSong(song);
  };

  return (
    <div className="min-h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] overflow-y-auto">
      <Table>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => handleClick(index, song)}
            >
              <TableCell>{song.name.split(".")[0]}</TableCell>
              <TableCell>{song.name.split(".")[1]}</TableCell>

              {/* <TableCell>
                <SongOptions />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayList;

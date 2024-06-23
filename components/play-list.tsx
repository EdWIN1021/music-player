"use client";

import React, { FC, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MusicContext } from "@/music-provider";
import { Ellipsis } from "lucide-react";

interface PlayListProps {
  songs: Song[];
}

const PlayList: FC<PlayListProps> = ({ songs }) => {
  const { setIsPlaying, setTrackIndex } = useContext(MusicContext);

  const handleClick = (index: number) => {
    setIsPlaying(true);
    setTrackIndex(index);
  };

  return (
    <div className="max-h-[calc(100vh-88px-103px-84px)] sm:max-h-[calc(100vh-88px-103px)]  overflow-y-auto">
      <Table>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <TableCell>{song.name.split("_")[0]}</TableCell>
              <TableCell>{song.name.split("_")[1]}</TableCell>
              <TableCell>
                <Ellipsis />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayList;

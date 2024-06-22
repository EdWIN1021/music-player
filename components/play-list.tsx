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

interface PlayListProps {
  fileNames: string[];
}

const PlayList: FC<PlayListProps> = ({ fileNames }) => {
  const { setIsPlaying, setTrackIndex } = useContext(MusicContext);

  const handleClick = (index: number) => {
    setIsPlaying(true);
    setTrackIndex(index);
  };

  return (
    <div className="max-h-[calc(100vh-88px-103px-84px)] sm:max-h-[calc(100vh-88px-103px)]  overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileNames.map((song, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{song.split("_")[0]}</TableCell>
              <TableCell>{song.split("_")[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayList;

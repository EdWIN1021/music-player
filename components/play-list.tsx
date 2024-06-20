"use client";

import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MusicContext } from "@/music-provider";
import { ScrollArea } from "./ui/scroll-area";

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
    <ScrollArea className="rounded-md border">
      <Table className="">
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
    </ScrollArea>
  );
};

export default PlayList;

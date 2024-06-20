"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PlayListProps {
  fileNames: string[];
  setTrackIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const PlayList: FC<PlayListProps> = ({
  fileNames,
  setTrackIndex,
  setIsPlaying,
}) => {
  const handleClick = (index: number) => {
    setIsPlaying(true);
    setTrackIndex(index);
  };

  return (
    <div className="flex-1">
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
              <TableCell>{song.split("-")[0]}</TableCell>
              <TableCell>{song.split("-")[1].split(".")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayList;

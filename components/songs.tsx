"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SongsProps {
  fileNames: string[];
}

const Songs: React.FC<SongsProps> = ({ fileNames }) => {
  return (
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
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{song.split("-")[0]}</TableCell>
            <TableCell>{song.split("-")[1].split(".")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Songs;

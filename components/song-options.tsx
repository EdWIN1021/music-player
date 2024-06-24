import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";

const SongOptions = () => {
  const [open, toggle] = useState(false);

  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverTrigger
        asChild
        className="hover:bg-slate-200 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          toggle((open) => !open);
        }}
      >
        <Ellipsis />
      </PopoverTrigger>
      <PopoverContent className="max-w-max">
        <Button
          className="rounded-full"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SongOptions;

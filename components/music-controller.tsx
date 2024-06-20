import React from "react";
import { Play, ArrowRightToLine, ArrowLeftToLine } from "lucide-react";

const MusicController = () => {
  return (
    <div className="flex justify-center p-2 ">
      <div className="flex gap-5 items-center">
        <ArrowLeftToLine />

        <div className="border rounded-full p-1.5 border-slate-950 cursor-pointer">
          <Play className="fill-slate-950 stroke-none" />
        </div>
        
        <ArrowRightToLine />
      </div>
    </div>
  );
};

export default MusicController;

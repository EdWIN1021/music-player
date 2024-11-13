"use client";

import { Badge } from "@/components/ui/badge";
import { Dispatch, SetStateAction } from "react";

interface ModesProps {
  setMode: Dispatch<SetStateAction<string>>;
}

const Modes: React.FC<ModesProps> = ({ setMode }) => {
  return (
    <div className="px-3 flex gap-3 mb-4 cursor-pointer">
      <Badge
        className="text-white text-md"
        variant="outline"
        onClick={() => setMode("normal")}
      >
        Normal
      </Badge>
      <Badge
        className="text-white text-md cursor-pointer"
        variant="outline"
        onClick={() => setMode("pure")}
      >
        Pure
      </Badge>
      <Badge
        className="text-white text-md bg-[#00C2CB] border-none cursor-pointer"
        variant="outline"
        onClick={() => setMode("enhanced")}
      >
        Enhanced
      </Badge>
    </div>
  );
};

export default Modes;

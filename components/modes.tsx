"use client";

import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface ModesProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

const Modes: React.FC<ModesProps> = ({ mode, setMode }) => {
  return (
    <div className="px-3 flex gap-3 mb-4 cursor-pointer">
      <Badge
        className={clsx("text-white text-md cursor-pointer ", {
          "bg-[#00C2CB] border-none": mode === "normal",
        })}
        variant="outline"
        onClick={() => setMode("normal")}
      >
        Normal
      </Badge>
      <Badge
        className={clsx("text-white text-md cursor-pointer ", {
          "bg-[#00C2CB] border-none": mode === "pure",
        })}
        variant="outline"
        onClick={() => setMode("pure")}
      >
        Pure
      </Badge>
      <Badge
        className={clsx("text-white text-md cursor-pointer ", {
          "bg-[#00C2CB] border-none": mode === "enhanced",
        })}
        variant="outline"
        onClick={() => setMode("enhanced")}
      >
        Enhanced
      </Badge>
    </div>
  );
};

export default Modes;

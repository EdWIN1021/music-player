import React from "react";

import { Ellipsis, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SongOptions = () => {
  // const [open, toggle] = useState(false);
  // return (
  //   <Popover open={open} onOpenChange={toggle}>
  //     <PopoverTrigger
  //       asChild
  //       className="hover:bg-slate-200 rounded-full"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         toggle((open) => !open);
  //       }}
  //     >
  //       <Ellipsis />
  //     </PopoverTrigger>
  //     <PopoverContent className="max-w-max">
  //       <Button
  //         className="rounded-full"
  //         variant="destructive"
  //         onClick={(e) => {
  //           e.stopPropagation();
  //         }}
  //       >
  //         Delete
  //       </Button>
  //     </PopoverContent>
  //   </Popover>
  // );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="hover:bg-slate-200 p-0.5 rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SongOptions;

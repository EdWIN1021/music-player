import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  return (
    <div className="flex-1">
      <div className="bg-gray-100 flex items-center gap-2 rounded-full px-2 py-1 max-w-80">
        <Search strokeWidth={2} />
        <Input
          className="bg-inherit border-0"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;

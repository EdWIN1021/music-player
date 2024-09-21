"use client";

import React, { useContext } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MusicContext } from "@/music-provider";

const SearchInput = () => {
  const { setSearch } = useContext(MusicContext);

  return (
    <div className="flex-1">
      <div className="bg-gray-100 flex items-center gap-2 rounded-full px-5 py-1 max-w-80 sm:flex">
        <Search strokeWidth={2} />
        <Input
          className="bg-inherit border-0"
          type="text"
          placeholder="Search"
          onChange={(e) =>
            setTimeout(() => {
              setSearch(e.target.value);
            }, 500)
          }
        />
      </div>
    </div>
  );
};

export default SearchInput;

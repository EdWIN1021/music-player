import React from "react";
import Image from "next/image";

import { Separator } from "./ui/separator";
import SongDownloader from "./song-downloader";

const header = () => {
  return (
    <>
      <div className="flex items-center px-10 py-5 justify-between">
        <div className="flex items-center text-2xl font-bold text-[#00C2CB] text-nowrap">
          <Image src={"logo.svg"} alt="logo" width="50" height="50" />
          Your Library
        </div>
        {/* <SearchInput /> */}
        {process.env.NODE_ENV === "development" && <SongDownloader />}
      </div>
    </>
  );
};

export default header;

import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import SearchInput from "./search-input";
import SongUploader from "./song-downloader";

const header = () => {
  return (
    <>
      <div className="flex items-center px-10 py-5">
        {/* <Image src={"logo.svg"} alt="logo" width="50" height="50" priority /> */}

        <h1 className="text-2xl font-semibold mr-10 text-[#00C2CB] text-nowrap">
          Your Library
        </h1>
        <SearchInput />

        {process.env.NODE_ENV === "development" && <SongUploader />}
      </div>
      <Separator />
    </>
  );
};

export default header;

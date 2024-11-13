import React from "react";
import Image from "next/image";
import SongDownloader from "./song-downloader";

const header = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-2xl font-bold text-[#00C2CB] text-nowrap">
          <Image
            style={{ height: "auto", width: "auto" }}
            src={"logo.svg"}
            alt="logo"
            width="50"
            height="50"
          />
          Your Library
        </div>
        {process.env.NODE_ENV === "development" && <SongDownloader />}
      </div>
    </>
  );
};

export default header;

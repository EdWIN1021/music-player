import React from "react";
import { Separator } from "./ui/separator";
import SearchInput from "./search-input";
import Uploader from "./Uploader";

const header = () => {
  return (
    <>
      <div className="flex items-center px-10 py-5">
        <h1 className="text-2xl font-semibold mr-10">Songs</h1>
        <SearchInput />

        {process.env.NODE_ENV === "development" && <Uploader />}
      </div>
      <Separator />
    </>
  );
};

export default header;

import React from "react";
import { Separator } from "./ui/separator";
import { Uploader } from "./Uploader";

const header = () => {
  return (
    <>
      <div className="flex items-center px-10 py-5">
        <h1 className="text-2xl font-semibold flex-1">Music Player</h1>

        {process.env.NODE_ENV === "development" && <Uploader />}
      </div>
      <Separator />
    </>
  );
};

export default header;

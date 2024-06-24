import { Home, Search, CloudUpload } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between pb-5 p-2 px-10 w-full  sm:hidden">
      <div className="flex flex-col items-center ">
        <Home />
        <span>Home</span>
      </div>

      <div className="flex flex-col items-center">
        <Search />
        <span>Search</span>
      </div>

      <div className="flex flex-col items-center">
        <CloudUpload />
        <span>Upload</span>
      </div>
    </div>
  );
};

export default Footer;

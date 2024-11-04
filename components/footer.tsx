import React from "react";
import Image from "next/image";
import { Home, Search, Folder } from "lucide-react";

const Footer = () => {
  return (
    <section className="flex justify-around items-end py-2">
      <div className="flex flex-col items-center gap-1">
        <Home />
        Home
      </div>
      <div className="flex flex-col items-center gap-1">
        <Search />
        Explore
      </div>
      <div className="flex flex-col items-center gap-1">
        <Folder />
        Library
      </div>
    </section>
  );
};

export default Footer;

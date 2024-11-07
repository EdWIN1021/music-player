import React from "react";
import { Home, Search, Folder } from "lucide-react";
import SearchDialog from "./search-dialog";

const Footer = () => {
  return (
    <section className="flex justify-around items-end">
      <div className="flex flex-col items-center gap-1">
        <Home />
        Home
      </div>

      <SearchDialog />

      <div className="flex flex-col items-center gap-1">
        <Folder />
        Library
      </div>
    </section>
  );
};

export default Footer;

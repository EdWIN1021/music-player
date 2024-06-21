import { Home, Search, UserRound } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between pb-5 pt-4 px-10 w-full  sm:hidden bg-slate-950 text-white">
      <div className="flex flex-col items-center ">
        <Home />
        <span>Home</span>
      </div>

      <div className="flex flex-col items-center">
        <Search />
        <span>Search</span>
      </div>

      <div className="flex flex-col items-center">
        <UserRound />
        <span>Account</span>
      </div>
    </div>
  );
};

export default Footer;

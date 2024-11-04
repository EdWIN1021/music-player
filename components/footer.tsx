import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="flex justify-around items-end py-2">
      <div className="flex flex-col items-center">
        <Image
          src="home.svg"
          width={21}
          height={21}
          style={{ height: "auto", width: "auto" }}
          alt="home"
        />
        Home
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={"search.svg"}
          width={21}
          height={21}
          style={{ height: "auto", width: "auto" }}
          alt="search"
        />
        Explore
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={"folder.svg"}
          width={21}
          height={21}
          style={{ height: "auto", width: "auto" }}
          alt="folder"
        />
        Library
      </div>
    </section>
  );
};

export default Footer;

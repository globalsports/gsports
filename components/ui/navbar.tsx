import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b shadow-xs">
      <div className="h-[60px] flex items-center justify-between max-w-7xl sm:mx-auto mx-5">
        <Link href={"/"} className="text-2xl font-bold">GSports</Link>
      </div>
    </div>
  );
};

export default Navbar;

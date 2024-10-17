import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b shadow-xs bg-gray-50">
      <div className="h-[60px] flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold">GSports</div>
        <div className="flex gap-5 text-md">
          <Link href={"/"}>Home</Link>
          <Link href={"/booking"}>Book</Link>
          <Link href={"/"}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

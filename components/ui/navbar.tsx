"use client"
import Link from "next/link";
import React from "react";
import { Skeleton } from "./skeleton";

const Navbar = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  return (
    <div className="border-b shadow-xs">
      {isLoading ? (
        <Skeleton className="h-[60px] w-full mx-auto" />
      ) : (
      <div className="h-[60px] flex items-center sm:justify-between justify-center max-w-7xl sm:mx-auto mx-5">
        <Link href={"/"}>
        <img src="./images/logo.png" alt="" className="h-[40px]"/>
        </Link>
      </div>
      )}
    </div>
  );
};

export default Navbar;

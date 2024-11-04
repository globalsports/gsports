"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoIosBasketball, IoMdFootball } from "react-icons/io";
import { MdOutlineGolfCourse, MdOutlineSportsVolleyball } from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";
interface NavItem {
  icon: React.ReactNode;
  label: string;
}

const IconNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems: NavItem[] = [
    { icon: <IoIosBasketball fontSize={24} />, label: "BasketBall" },
    { icon: <MdOutlineGolfCourse fontSize={24}/>, label: "Golf" },
    { icon: <IoMdFootball fontSize={24}/>, label: "Football" },
    { icon: <MdOutlineSportsVolleyball fontSize={24}/>, label: "Volleyball" },
    { icon: <GiShuttlecock fontSize={24}/>, label: "Badminton" },
    { icon: <IoIosBasketball fontSize={24} />, label: "BasketBall" },
    { icon: <MdOutlineGolfCourse fontSize={24}/>, label: "Golf" },
    { icon: <IoMdFootball fontSize={24}/>, label: "Football" },
    { icon: <MdOutlineSportsVolleyball fontSize={24}/>, label: "Volleyball" },
    { icon: <GiShuttlecock fontSize={24}/>, label: "Badminton" },
    { icon: <IoIosBasketball fontSize={24} />, label: "BasketBall" },
    { icon: <MdOutlineGolfCourse fontSize={24}/>, label: "Golf" },
    { icon: <IoMdFootball fontSize={24}/>, label: "Football" },
    { icon: <MdOutlineSportsVolleyball fontSize={24}/>, label: "Volleyball" },
    { icon: <GiShuttlecock fontSize={24}/>, label: "Badminton" },
  ];

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-10 p-4">
          {navItems.map((item, index) => (
            <div key={item.label} className="flex flex-col justify-center items-center">
              <div>{item.icon}</div>
              <div className="text-sm font-medium">{item.label}</div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default IconNavBar;

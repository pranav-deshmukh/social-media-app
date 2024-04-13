"use client"
import { CircleUser, Home, MenuIcon } from "lucide-react";
import { Telescope } from "lucide-react";
import { MessageSquare } from "lucide-react";

const Menu = () => {
  return (
    <div className="w-[400px]  h-svh flex flex-col border-r border-red-900">
      <div className="ml-10 h-full flex flex-col justify-between  mt-10">
        <div className="h-[10%] ">
          <h1 className="text-2xl">Social Media Platform</h1>
        </div>
        <div className="text-xl h-[70%] flex flex-col gap-8">
          <div className="flex gap-2 cursor-pointer">
            <Home />
            <p>Home</p>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <Telescope />
            <p>Explore</p>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <MessageSquare />
            <p>Messages</p>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <CircleUser />
            <p>Profile</p>
          </div>
        </div>
        <div className="text-xl h-[20%] flex items-end">
          <div className="flex gap-2 cursor-pointer mb-4">
            <MenuIcon/>
            <p>More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

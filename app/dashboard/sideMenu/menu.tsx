"use client"

import { CircleUser, Home, Telescope, MessageSquare, MenuIcon, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter(); 

  const handleNavigation = (path:string) => {
    router.push(path);
  };

  return (
    <div className="w-[360px] h-screen flex flex-col border-r">
      <div className="ml-10 h-full flex flex-col justify-between mt-10">
        <div className="h-[10%]">
          <h1 className="text-2xl">Social Media Platform</h1>
        </div>
        <div className="text-lg h-[70%] flex flex-col gap-8">
          <div className="flex gap-2 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
            <Home />
            <p>Home</p>
          </div>
          <div className="flex gap-2 cursor-pointer" onClick={() => handleNavigation('/dashboard/newPosts')}>
            <Telescope />
            <p>Explore</p>
          </div>
          <div className="flex gap-2 cursor-pointer" onClick={() => handleNavigation('/dashboard/messages')}>
            <MessageSquare />
            <p>Messages</p>
          </div>
          <div className="flex gap-2 cursor-pointer" onClick={() => handleNavigation('/dashboard/userPost')}>
            <CirclePlus />
            <p>Post</p>
          </div>
          <div className="flex gap-2 cursor-pointer" onClick={() => handleNavigation('/dashboard/profile')}>
            <CircleUser />
            <p>Profile</p>
          </div>
        </div>
        <div className="text-xl h-[20%] flex items-end">
          <div className="flex gap-2 cursor-pointer mb-4" onClick={() => handleNavigation('/more')}>
            <MenuIcon />
            <p>More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

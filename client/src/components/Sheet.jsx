import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React, { useState } from 'react'
import { RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const SideSheet = () => {
const [isOpen, setIsOpen] = useState(false);

const handleLinkClick = () => {
  setIsOpen(false); 
};

return (
  <div className="md:hidden">
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <RiMenu3Line />
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-purple-800 font-bold">Eventify</SheetTitle>
          <hr className="flex-grow border-gray-400 rounded-md border-1" />
          <SheetDescription />
        </SheetHeader>
        
        {/* This section will grow to fill the space */}
        <div className="flex-grow">
          <ul className="text-start text-lg">
            <li>
              <NavLink 
                to='/'
                className={({ isActive }) => `
                  ${isActive ? "text-black underline" : "text-gray-400"}
                `}
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/myevents'
                className={({ isActive }) => `
                  ${isActive ? "text-black underline" : "text-gray-400"}
                `}
                onClick={handleLinkClick}
              >
                My Tickets
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/profile'
                className={({ isActive }) => `
                  ${isActive ? "text-black underline" : "text-gray-400"}
                `}
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout button at the bottom */}
        <div className="mt-auto pb-4">
          <Button className="shadow-2xl shadow-black">Logout</Button>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);
}

export default SideSheet;

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

const SideSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <div className="md:hidden" >
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger>
    <RiMenu3Line />
    </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="text-purple-800 font-bold" >Eventify</SheetTitle>
      <hr className="flex-grow border-gray-400 rounded-md border-1" />
      <SheetDescription>
      </SheetDescription>
        <div>
        <ul className="text-start text-lg " >
        <li>
                        <NavLink to='/' 
                        className={({ isActive }) => ` 
                ${isActive ? "text-black underline" : "text-gray-400"}
            `
                        }
                        onClick={handleLinkClick}
                         >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/myevents' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-gray-400"}
            `
                        } 
                        onClick={handleLinkClick}
                        >My Tickets</NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-gray-400"}
            `
                        }
                        onClick={handleLinkClick}
                        >Profile</NavLink>
                    </li>
        </ul>
        </div>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default SideSheet


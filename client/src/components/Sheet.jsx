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
import { jwtDecode } from "jwt-decode";

const SideSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };


  const token = localStorage.getItem("userToken")

  let role = null

  if (token && token.includes('.')) {
    try {
      role = jwtDecode(String(token)).role
      console.log(role)
    } catch (error) {
      console.error("Invalid token:", error)
    }
  }

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
              {
                (role === "superadmin" || role === "admin") && (
                  <li>
                    <NavLink to='/create' className={({ isActive }) => `
${isActive ? "text-black underline" : "text-gray-400"}
`}
  onClick={handleLinkClick} >Create Event</NavLink>
                  </li>
                ) || (role === null || role === "user") && (

                  <li>
                    <NavLink to='/mytickets' className={({ isActive }) => `
               ${isActive ? "text-black underline" : "text-gray-400"}
               `}
                 onClick={handleLinkClick}
                     >My Tickets</NavLink>
                  </li>
                )}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideSheet;

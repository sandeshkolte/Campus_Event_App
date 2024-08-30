import React from 'react'
import { NavLink } from 'react-router-dom'
import { TbBrandGoogleHome } from "react-icons/tb";
import { SiEventstore } from "react-icons/si";

const NavBar = () => {

  return (
    // <div className='flex justify-center bg-purple-100 py-3 space-x-10 fixed bottom-0 w-full min-[600px]:hidden'>
        <div className="footer text-white flex justify-between items-center w-full fixed bottom-0 z-[10] bg-zinc-900 px-10 py-3 min-[600px]:hidden ">
                        <NavLink to='/' className={({ isActive }) => ` 
                ${isActive ? "text-white-500 font-semibold" : "text-white"}
            `
                        } ><TbBrandGoogleHome className='text-2xl' /></NavLink>
                        <NavLink to='/myevents' className={({ isActive }) => `
                ${isActive ?"text-white-500 font-semibold" : "text-white"}
            `
                        } ><SiEventstore /></NavLink>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ?"text-white-500 font-semibold" : "text-white"}
            `
                        } >              
            <div className="w-8 h-8 bg-zinc-300 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src="https://i.pinimg.com/originals/7d/ff/55/7dff551f2d67f821295ee46d87cdf709.jpg" alt=""/>
          </div>
                        </NavLink>
      </div>
    // </div>
  )
}

export default NavBar
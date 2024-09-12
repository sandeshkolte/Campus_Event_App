import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SideSheet from './Sheet';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

const token = localStorage.getItem("userToken")

let role = null

if (token && token.includes('.')) {
  try {
    role = jwtDecode(String(token)).role
    // console.log(role)
  } catch (error) {
    console.error("Invalid token:", error)
  }
}

    return (
        <header className="w-full bg-slate-50 p-5 shadow-lg shadow-purple-200">
            <div className='flex justify-between'>
            
                <h1 className='bg-gradient-to-r from-purple-400 to-indigo-600 font-bold text-transparent bg-clip-text' >Eventify</h1>
            
                <ul className='md:flex justify-center flex-row gap-5 font-semibold hidden'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ` 
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >Home</NavLink>
                    </li>

                    {
                    (role==="superadmin"||role==="admin") && (
  <li>
    {/* <div className='bg-gray-950 text-white p-2 rounded-md ' > */}
  <NavLink to='/create' className={({ isActive }) => `
${isActive ? "text-black underline " : "text-black"}
`
  } ><h3>Create Event</h3></NavLink>
    {/* </div> */}
</li>
                    ) || (role===null || role==="user") && (

                    <li>
                        <NavLink to='/mytickets' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >My Tickets</NavLink>
                    </li>
                    ) }
                    <li>
                      { (role==="superadmin"||role==="admin") && (
                           
                            <NavLink to='/organised' className={({ isActive }) => `
                          ${isActive ? "text-black underline" : "text-black"}
                          `
                            } >Events Organised</NavLink>
                          
                                              )}
                    </li>
                    <li>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >Profile</NavLink>
                    </li>

                </ul>
                {/* <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? " shadow-lg shadow-orange-300 rounded-3xl" : "text-black"}
            `}>
                    <div className='outline-black outline-4'>
                        <img className='h-10 rounded-3xl object-cover' src={userInfo.image} alt="profile" />
                    </div></NavLink> */}
<SideSheet/>
            </div>
        </header>
    )
}

export default Header
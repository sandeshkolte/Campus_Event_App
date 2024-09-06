import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SideSheet from './Sheet';

const Header = () => {

    
    const userInfo = useSelector((state) => state.auth.userInfo)

    return (
        <header className="w-full bg-slate-50 px-5 py-2 shadow-lg shadow-purple-200">
            <div className='flex justify-between'>
                <h1 className='bg-gradient-to-r from-purple-400 to-indigo-600 font-bold text-transparent bg-clip-text' >Eventify</h1>
                <ul className='md:flex justify-center flex-row gap-5 font-semibold hidden'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ` 
                ${isActive ? "text-black" : "text-gray-400"}
            `
                        } >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/myevents' className={({ isActive }) => `
                ${isActive ? "text-black" : "text-gray-400"}
            `
                        } >My Tickets</NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? "text-black" : "text-gray-400"}
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
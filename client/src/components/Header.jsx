import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';



const Header = () => {
    
    const userInfo = useSelector((state)=> state.auth.userInfo)

    return (
        <header className="w-full bg-slate-50 p-5">
            <div className='flex justify-between'>
                <h1 className='bg-gradient-to-r from-purple-400 to-indigo-600 font-bold text-transparent bg-clip-text' >Eventify</h1>
                <ul className='flex justify-center flex-row gap-5 font-semibold max-sm:hidden '>
                    <li>
                        <NavLink to='/' className={({ isActive }) => ` 
                ${isActive ? "text-purple-500" : "text-black"}
            `
                        } >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/myevents' className={({ isActive }) => `
                ${isActive ? "text-purple-500" : "text-black"}
            `
                        } >My Events</NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? "text-purple-500" : "text-black"}
            `
                        } >Profile</NavLink>
                    </li>

                </ul>
                {/* <div className='outline-black outline-4'>
                    <img className='h-12 rounded-3xl object-cover' src={userInfo.image} alt="profile" />
                </div> */}
            </div>
        </header>
    )
}

export default Header
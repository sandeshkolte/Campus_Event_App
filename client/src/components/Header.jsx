import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SideSheet from './Sheet';
import { jwtDecode } from 'jwt-decode';
import AnimatedButton from './AnimatedButton';

const Header = () => {

const token = localStorage.getItem("userToken")
const userInfo = localStorage.getItem("userInfo")

let role = null
let userimg = null

if (userInfo) {
  try {
    userimg =  JSON.parse(userInfo).image
    // console.log(role)
    console.log(userimg)
  } catch (error) {
    console.error("Invalid info:", error)
  }
}


if (token && token.includes('.')) {
  try {
    role = jwtDecode(String(token)).role
    userimg =  JSON.parse(userInfo).image
    // console.log(role)
    console.log(userimg)
  } catch (error) {
    console.error("Invalid token:", error)
  }
}

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white p-5 md:shadow-lg md:shadow-purple-200">
            <div className=' flex justify-between'>
            
                <h1 className='bg-gradient-to-r from-purple-400 to-indigo-600 font-bold text-xl text-transparent bg-clip-text' >Eventify</h1>
            
                <ul className='md:flex justify-center flex-row gap-5 font-semibold hidden'>

{/* Login button to show for guest user */}
{/* <li>
  <div className='bg-gray-950 px-2 py-1 rounded-md' >
<span className='gradient-text text-transparent animate-gradient ' >Log in</span>
  </div>
</li> */}

                   { (userInfo!=null) && ( <li>
                        <NavLink to='/' className={({ isActive }) => ` 
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >Home</NavLink>
                    </li>)}

                    {
                    (role==="superadmin"||role==="admin") && (
  <li>
    {/* <div className='bg-gray-950 text-white p-2 rounded-md ' > */}
  <NavLink to='/create' className={({ isActive }) => `
${isActive ? "text-black underline " : "text-black"}
`
  } >
    <div className='bg-gray-950 text rounded-md py-1 text-white px-2' >
    <h3 className='text-sm' >Create Event</h3>
    </div>
    </NavLink>
    {/* </div> */}
</li>
                    ) || (role==="user" && (userInfo!=null)  ) && (
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
                    { (role==="user" && (userInfo!=null)  ) && (
                    <li>
                        <NavLink to='/login' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >Photo Gallery</NavLink>
                    </li>
                    ) 

                    }
                    {
                 (userInfo!=null) && (  <li>
                        <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? "text-black underline" : "text-black"}
            `
                        } >
                           <div className='outline-black outline-4'>
                        <img className='h-10 rounded-3xl object-cover' src={userimg} alt="profile" />
                    </div>
                        </NavLink>
                    </li>)}
                   
                </ul>
                {/* <NavLink to='/profile' className={({ isActive }) => `
                ${isActive ? " shadow-lg shadow-orange-300 rounded-3xl" : "text-black"}
            `}>
                    <div className='outline-black outline-4'>
                        <img className='h-10 rounded-3xl object-cover' src={userInfo.image} alt="profile" />
                    </div></NavLink> */
                    }
                    {
token!=null ?
<SideSheet/> : <AnimatedButton/>
                    }
            </div>
        </header>
    )
}

export default Header
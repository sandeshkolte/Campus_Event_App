import React from 'react'
import { NavLink } from 'react-router-dom'

const AnimatedButton = () => {
  return (
    <div className='px-3 py-1 rounded-md bg-gray-950' >
        <NavLink to={"login"} >
<h3 className='text-white text-lg cursor-pointer' >Log in</h3>
        </NavLink>
    </div>
  )
}

export default AnimatedButton
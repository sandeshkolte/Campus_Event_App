import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-between w-full h-10 border border-t border-gray-200  backdrop-blur-lg bg-white bg-opacity-30 pr-3 text-sm text-center' >
        <h1 className='pl-5' >© 2024 GCOEC-Eventify</h1>
        <div className='flex gap-10 pr-5' >
        <h1 >Terms of Service</h1>
        <h1 >Privacy Policy</h1>
        <h1 >Cookies</h1>
        </div>
    </div>
  )
}

export default Footer
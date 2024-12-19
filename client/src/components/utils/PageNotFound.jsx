import React from 'react'

const PageNotFound = () => {
  return (
    <div className='h-screen md-max-h-screen w-full flex justify-center items-center bg-gray-200' >
        <p>
            <span className='font-medium md:text-7xl text-3xl' >

            Our Apologies <br />We are unable to find the <br />page you are looking for.
            </span>
            <span className='text-gray-900 font-light' >
             <br />404. Page Not Found 
            </span>
             </p>
        
    </div>
  )
}

export default PageNotFound
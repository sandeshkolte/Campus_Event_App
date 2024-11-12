import { Circle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const OrganizersComponent = () => {
  return (
    <div className='p-10 w-full flex justify-center ' >
      <div className='w-[75%]' >
        <div className='grid grid-cols-4 gap-y-2 gap-x-2' >
          <div className=' relative flex justify-center items-center bg-transparent rounded-3xl h-60 w-full group' >
            <img src="https://i.pinimg.com/736x/1f/81/ca/1f81ca5d0f2ecd5a6e2b268aecca1d21.jpg" className='overflow-hidden transition-all duration-300 group-hover:blur-sm object-cover h-full backdrop-blur-sm rounded-3xl ' alt="acses" />
            <h3 className=' absolute text-3xl font-bold text-center text-white backdrop-blur-sm' >ACSES</h3>
            <p className='opacity-0 absolute text-center text-white bottom-10 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-300' >Association of Computer Science and Engineering Students</p>
          </div>
          <div className=' flex justify-center items-center bg-pink-200 rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center' >Hello GCOEC</h3>
          </div>
          <div className=' flex justify-center items-center bg-black rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center text-gray-200' >Hello GCOEC</h3>
          </div>
          <div className=' flex justify-center items-center bg-[#e1ebf4] rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center' >Hello GCOEC</h3>
          </div>
          <div className=' flex justify-center items-center col-span-2 bg-sky-200 rounded-3xl h-60  w-full' >
            <h3 className='text-5xl font-medium text-center flex relative' >
              <Circle className='absolute size-16 bg-gradient-to-r from-gray-100 to-purple-400 rounded-full text-transparent left-5 ' />
              <span className='pr-8'  ><Circle className='text-gray-900 size-16 ' /></span>
              GCOEC</h3>
          </div>
          <div className=' flex justify-center items-center bg-rose-200 rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center' >Hello GCOEC</h3>
          </div> <div className=' flex justify-center items-center bg-black rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center text-gray-200' >Hello GCOEC</h3>
          </div> <div className=' flex justify-center items-center bg-black rounded-3xl h-60  w-full' >
            <h3 className='text-3xl font-bold text-center text-gray-200' >Hello GCOEC</h3>
          </div> <div className=' flex justify-center items-center bg-[#f8d9ff] rounded-3xl h-full w-full' >
            <h3 className='text-3xl font-bold text-center' >Hello GCOEC</h3>
          </div>
          <div className=' flex justify-center items-center col-span-2 bg-blue-200 rounded-3xl h-60  w-full' >
            <h3 className='text-3xl font-bold text-center' >Hello GCOEC</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizersComponent
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const EventsOrganised = () => {
  return (
    <div className='mt-5'>
     <div className='h-20 bg-indigo-50 w-full flex items-center justify-center sm:justify-between md:px-32' >
      <h3 className='flex p-5 font-bold text-xl' >Events Organised</h3>
      <Button className="hidden sm:flex bg-indigo-500 mx-2 text-white rounded-3xl">
        <Link to={"/"} >
        Explore more Events
        </Link>
        </Button>
      </div>
      <div className='md:px-32' >
<div className='bg-slate-50 rounded-xl h-36 text-center flex flex-col items-center mt-5 mx-5 p-10' >
  <h3 className='text-xl font-bold' >No event tickets purchased yet</h3>
  <p className='text-sm font-semibold ' >No worries  plenty of new events to explore!</p>
</div>
      </div>

    </div>
  )
}

export default EventsOrganised
import EventDetail from '@/components/EventDetail'
import React from 'react'

const MyEvents = () => {
  return (
    <div className='mt-5'>
     <div className='h-20 bg-indigo-50 w-full' >
      <h3 className='flex p-5 font-bold text-xl' >My Events</h3>
      </div>
<div className='bg-slate-50 rounded-xl h-36 text-center flex flex-col items-center mt-5 mx-5 p-10' >
  <h3 className='text-xl font-bold' >No events have been created yet</h3>
  <p className='text-sm font-semibold ' >Come back later, events are coming soon...</p>
</div>

    </div>
  )
}

export default MyEvents
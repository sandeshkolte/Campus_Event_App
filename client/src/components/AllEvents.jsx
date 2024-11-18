import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EventCard from './EventCard'

const AllEvents = () => {

  const events = useSelector((state) => state.event?.events)
  return (
    <div className='w-full overflow-x-auto' >
      <ul className='events flex md:flex-wrap gap-8 md:gap-16 p-6 md:p-10 w-max md:w-full md:justify-center' >
        {events.map((event) => (
          <li className='event flex-shrink-0' key={event._id} >
            <Link to={`/eventdetails/${event._id}`} >
              <EventCard event={event} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllEvents
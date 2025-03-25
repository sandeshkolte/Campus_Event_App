import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EventCard from './EventCard'

const AllEvents = () => {

  const events = useSelector((state) => state.event?.events.filter(event => event.isActive === true))
  return (
    <div className='w-full h-auto' >
      <ul className='events md:flex md:flex-wrap gap-8 md:gap-16 md:p-10 md:w-full md:justify-center' >
        {events.map((event) => (
          <li className='event ' key={event._id} >
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
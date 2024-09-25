import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EventCard from './EventCard'

const AllEvents = () => {

  const events = useSelector((state) => state.event?.events)
  return (
    <div>
      <ul className='flex flex-wrap gap-8 p-10 w-full justify-center' >
        {events.map((event) => (
          <li className='event' key={event._id} >
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';
import { baseUrl } from '@/common/common';

const RelatedEvents = ({eventDetails}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchRelatedEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/event/related?branch=${eventDetails?.organizingBranch}`); // Replace with your actual API endpoint
       
       if(response.data.response.length>1){
         setEvents(response.data.response); // Adjust based on your API response structure
       }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching related events:', err);
        setError(err.message || 'Failed to fetch related events');
        setLoading(false);
      }
    };

    fetchRelatedEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h3 className='mt-10 mb-10 sm:mb-0 ml-4 text-2xl font-bold md:mx-20'>Related Events</h3>
      <div className='w-full overflow-x-auto'>
        <ul className='events flex md:flex-wrap gap-8 md:gap-16 p-6 md:p-10 w-max md:w-full md:justify-center'>
          {events?.length > 0 ? (
            events.map((event) => (
              <li className='event flex-shrink-0' key={event._id}>
                <Link to={`/eventdetails/${event._id}`}>
                  <EventCard event={event} />
                </Link>
              </li>
            ))
          ) : (
            <p>No related events found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RelatedEvents;

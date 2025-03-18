import React, { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Tech Expo 2024',
    time: 'Fri 12:00 PM',
    location: 'Main Auditorium',
    status: 'Active',
    pendingRequests: 2,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=200&h=120',
    ticketsSold: true
  },
  {
    id: 2,
    title: 'Cultural Fest 2024',
    time: 'Mon 7:30 PM',
    location: 'Auditorium GCOEC',
    status: 'Active',
    pendingRequests: 2,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=200&h=120',
    ticketsSold: true
  },
  {
    id: 3,
    title: 'Sports Meet 2024',
    time: 'Mon 1:30 PM',
    location: 'Sports Ground',
    status: 'Active',
    pendingRequests: 0,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=120',
    ticketsSold: true
  },
  {
    id: 4,
    title: 'Robo Sumo',
    time: 'Wed 10:00 AM',
    location: 'GCOEC Main Ground',
    status: 'Active',
    pendingRequests: 0,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=120',
    ticketsSold: false
  }
];

function CertificatePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="ml-4 block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by date</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="flex-shrink-0 w-48 h-32 relative">
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Active
                  </div>
                  <img className="w-full h-full object-cover" src={event.image} alt={event.title} />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{event.time} · {event.location}</p>
                      {event.ticketsSold && <p className="mt-1 text-sm text-gray-500">Tickets Sold</p>}
                    </div>
                    <div className="flex flex-col items-end">
                      <select className="block w-24 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>Active</option>
                      </select>
                      {event.pendingRequests > 0 ? (
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {event.pendingRequests} pending
                        </div>
                      ) : (
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          No Pending Requests
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;

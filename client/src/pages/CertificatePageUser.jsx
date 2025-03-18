"use client"

import { useState } from "react"
import { Search } from "lucide-react"


import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventCard from "@/components/EventCard"
import CertificateCard from "@/components/CertificateCard"
import { useSelector } from "react-redux"

// Sample event data
const events = [
  {
    id: 1,
    title: "Tech Expo 2024",
    time: "Fri 12:00 PM",
    location: "Main Auditorium",
    status: "Active",
    pendingRequests: 2,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=200&h=120",
    ticketsSold: true,
    date: new Date("2024-03-15"),
  },
  {
    id: 2,
    title: "Cultural Fest 2024",
    time: "Mon 7:30 PM",
    location: "Auditorium GCOEC",
    status: "Active",
    pendingRequests: 2,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=200&h=120",
    ticketsSold: true,
    date: new Date("2024-03-18"),
  },
  {
    id: 3,
    title: "Sports Meet 2024",
    time: "Mon 1:30 PM",
    location: "Sports Ground",
    status: "Active",
    pendingRequests: 0,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=120",
    ticketsSold: true,
    date: new Date("2024-03-18"),
  },
  {
    id: 4,
    title: "Robo Sumo",
    time: "Wed 10:00 AM",
    location: "GCOEC Main Ground",
    status: "Active",
    pendingRequests: 0,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=120",
    ticketsSold: false,
    date: new Date("2024-03-20"),
  },
]

export default function CertificatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Filter events based on search term
  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const events1 = useSelector((state) => state.event.events);

  console.log(events1)

  // Sort events based on selected criteria
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return a.date.getTime() - b.date.getTime()
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "location") {
      return a.location.localeCompare(b.location)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Certificates</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by date</SelectItem>
              <SelectItem value="title">Sort by title</SelectItem>
              <SelectItem value="location">Sort by location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedEvents.length > 0 ? (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <CertificateCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
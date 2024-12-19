import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy, Users } from "lucide-react"
import { useSelector } from "react-redux"
import { WinnerDeclarationPopup } from "@/components/WinnerDeclarationPopup"
import WinnersPopover from "@/components/WinnersPopover"
import { useState } from "react"


export default function EventsOrganized() {

  const events = useSelector((state) => state.event.myOrganizedEvents);

  return (
    <div className="container max-w-6xl mx-auto p-4 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Events Organized</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search events" className="pl-8" />
        </div>
        <div className="w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="date-asc">Date (Ascending)</SelectItem>
              <SelectItem value="date-desc">Date (Descending)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event._id} className="flex flex-col sm:flex-row items-center relative">
                       { event.winners.length>0 &&  <div className="absolute top-1 right-1">
                <WinnersPopover  organisedEvent={event} />
              </div>}
            <div className="w-full sm:w-24 h-24 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
              {
                event.isActive ? <Badge className="absolute top-1 right-1 bg-green-500 text-white">Active</Badge> : <Badge className="absolute top-1 right-1 bg-red-500 text-white">Closed</Badge>
              }
              {/* <Badge className="absolute top-1 right-1 bg-red-500 text-white">{event.isActive ? "Active" : "Closed"}</Badge> */}
            </div>
            <CardHeader className="flex-1">
              <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
              <p className="text-sm text-gray-500">{event.date} · {event.location}</p>
              <p className="text-sm text-gray-500">
                {event.ticketsSold}/{event.totalTickets} tickets sold
              </p>
            </CardHeader>
            <CardContent className="flex items-center">
              <Button variant="outline" size="sm" className="flex sm:mr-5 border-gray-100 border-2 items-center gap-2">
                <Users className="h-4 w-4" />
                Show Participants List
              </Button>
              <WinnerDeclarationPopup event={event} />
            </CardContent>
            
          </Card>
        ))}
      </div>
    </div>
  )
}
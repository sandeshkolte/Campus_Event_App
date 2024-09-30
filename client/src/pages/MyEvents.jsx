import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Search, Calendar, MapPin, Ticket } from "lucide-react"

const events = [
  {
    id: 1,
    title: "GCOEC: Live in Concert",
    date: "May 20, 2024 at 10 PM",
    location: "Harmony Theater, Winnipeg, MB",
    ticketsSold: 350,
    totalTickets: 500,
    status: "Pending",
    image: "https://th.bing.com/th/id/OIP.iRt7bpuacg0Rl9e_doqdGAHaE7?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    title: "GCOEC — DJ Night",
    date: "Jun 2, 2024 at 8 PM",
    location: "Moonbeam Arena, Uxbridge, ON",
    ticketsSold: 72,
    totalTickets: 150,
    status: "Pending",
    image: "https://th.bing.com/th/id/OIP.W2giC8TjletygTa_fV67_AHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    title: "Blind Coding",
    date: "Aug 5, 2024 at 4 PM",
    location: "Electric Coliseum, New York, NY",
    ticketsSold: 275,
    totalTickets: 275,
    status: "Closed",
    image: "https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg",
  },
  {
    id: 4,
    title: "GCOEC Party Night",
    date: "Dec 31, 2024 at 8 PM",
    location: "Tapestry Hall, Cambridge, ON",
    ticketsSold: 6,
    totalTickets: 40,
    status: "Pending",
    image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
  },
]

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Tickets</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search tickets..." className="pl-10 bg-white border-gray-200" />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-[180px] bg-white border-gray-200">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Ascending)</SelectItem>
                <SelectItem value="date-desc">Date (Descending)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" className="bg-white hover:bg-gray-100">Conformed</Button>
          <Button variant="outline" className="bg-white hover:bg-gray-100">Pending</Button>
          <Button variant="outline" className="bg-white hover:bg-gray-100">Rejected</Button>
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-32 h-32 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-start md:items-center p-6">
                  <CardHeader className="flex-1 p-0 md:pr-4">
                    <CardTitle className="text-2xl font-bold mb-2 text-gray-800">{event.title}</CardTitle>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {event.date}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Ticket className="h-4 w-4 mr-2 text-gray-400" />
                        {event.ticketsSold}/{event.totalTickets} tickets sold
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 md:mt-0 mr-10">
                    <Button variant="outline" size="sm" className="bg-white hover:bg-gray-100">
                      View
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
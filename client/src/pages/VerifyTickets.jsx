import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const events = [
  {
    id: 1,
    title: "GCOEC: Live in Concert",
    date: "May 20, 2024 at 10 PM",
    location: "Harmony Theater, Winnipeg, MB",
    ticketsSold: 350,
    totalTickets: 500,
    image: "https://th.bing.com/th/id/OIP.iRt7bpuacg0Rl9e_doqdGAHaE7?rs=1&pid=ImgDetMain",
    pendingRequests: 15,
  },
  {
    id: 2,
    title: "GCOEC — DJ Night",
    date: "Jun 2, 2024 at 8 PM",
    location: "Moonbeam Arena, Uxbridge, ON",
    ticketsSold: 72,
    totalTickets: 150,
    image: "https://th.bing.com/th/id/OIP.W2giC8TjletygTa_fV67_AHaE8?rs=1&pid=ImgDetMain",
    pendingRequests: 8,
  },
  {
    id: 3,
    title: "Blind Coding",
    date: "Aug 5, 2024 at 4 PM",
    location: "Electric Coliseum, New York, NY",
    ticketsSold: 275,
    totalTickets: 275,
    image: "https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg",
    pendingRequests: 0,
  },
  {
    id: 4,
    title: "GCOEC Party Night",
    date: "Dec 31, 2024 at 8 PM",
    location: "Tapestry Hall, Cambridge, ON",
    ticketsSold: 6,
    totalTickets: 40,
    image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
    pendingRequests: 3,
  },
  {
    id: 5,
    title: "Blind Coding",
    date: "Aug 5, 2024 at 4 PM",
    location: "Electric Coliseum, New York, NY",
    ticketsSold: 275,
    totalTickets: 275,
    image: "https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg",
    pendingRequests: 5,
  },
  {
    id: 6,
    title: "GCOEC Party Night",
    date: "Dec 31, 2024 at 8 PM",
    location: "Tapestry Hall, Cambridge, ON",
    ticketsSold: 6,
    totalTickets: 40,
    image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
    pendingRequests: 1,
  },
]

export default function VerifyTickets() {
 

  const navigate=useNavigate();

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`); 
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Verify Events Tickets</h1>
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
      <div className="space-y-2">
        {events.map((event) => (
          <Card key={event.id}
           className="flex flex-col sm:flex-row items-center"
           onClick={() => handleCardClick(event.id)}>
            <div className="w-full sm:w-24 h-24 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
              <Badge className="absolute top-1 right-1 bg-green-500 text-white">Active</Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
              <p className="text-sm text-gray-500">{event.date} · {event.location}</p>
              <p className="text-sm text-gray-500">
                {event.ticketsSold}/{event.totalTickets} tickets sold
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
            <Badge 
                variant="secondary" 
                className={`mb-1 ${
                  event.pendingRequests > 0 
                    ? 'bg-red-100 text-red-800 border-red-200' 
                    : 'bg-green-100 text-green-800 border-green-200'
                }`}
              >
                {event.pendingRequests > 0 
                  ? `${event.pendingRequests} pending`
                  : "No Pending Requests"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
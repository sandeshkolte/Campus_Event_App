import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import EventTickets from "@/components/eventTicket";

const events = [
  {
    id: 1,
    title: "GCOEC: Live in Concert",
    date: "May 20, 2024 at 10 PM",
    location: "Harmony Theater, Winnipeg, MB",
    ticketsSold: 350,
    totalTickets: 500,
    status: "Pending",
    image:
      "https://th.bing.com/th/id/OIP.iRt7bpuacg0Rl9e_doqdGAHaE7?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    title: "GCOEC — DJ Night",
    date: "Jun 2, 2024 at 8 PM",
    location: "Moonbeam Arena, Uxbridge, ON",
    ticketsSold: 72,
    totalTickets: 150,
    status: "Pending",
    image:
      "https://th.bing.com/th/id/OIP.W2giC8TjletygTa_fV67_AHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    title: "Blind Coding",
    date: "Aug 5, 2024 at 4 PM",
    location: "Electric Coliseum, New York, NY",
    ticketsSold: 275,
    totalTickets: 275,
    status: "Confirmed",
    image:
      "https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg",
  },
  {
    id: 4,
    title: "GCOEC Party Night",
    date: "Dec 31, 2024 at 8 PM",
    location: "Tapestry Hall, Cambridge, ON",
    ticketsSold: 6,
    totalTickets: 40,
    status: "Confirmed",
    image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
  },
  {
    id: 5,
    title: "Blind Coding",
    date: "Aug 5, 2024 at 4 PM",
    location: "Electric Coliseum, New York, NY",
    ticketsSold: 275,
    totalTickets: 275,
    status: "Rejected",
    image:
      "https://i.pinimg.com/originals/48/89/38/488938d6eec996de2365b072357aac16.jpg",
  },
  {
    id: 6,
    title: "GCOEC Party Night",
    date: "Dec 31, 2024 at 8 PM",
    location: "Tapestry Hall, Cambridge, ON",
    ticketsSold: 6,
    totalTickets: 40,
    status: "Rejected",
    image: "https://dcmsblog.uk/wp-content/uploads/2014/09/events.jpg",
  },
];

export default function Component() {
  const [statusFilter, setStatusFilter] = useState("Confirmed"); // Default to "Confirmed"
  const [previousFilter, setPreviousFilter] = useState(statusFilter); // Track the previous filter
  const [slideDirection, setSlideDirection] = useState(""); // Track the direction of the slide
  const [isSliding, setIsSliding] = useState(false); // Track whether sliding is happening
  const [displayedEvents, setDisplayedEvents] = useState(events.filter((event) => event.status === "Confirmed")); // Displayed events

  useEffect(() => {
    if (previousFilter !== statusFilter) {
      // Determine the sliding direction based on the current and previous filters
      const direction =
        (previousFilter === "Rejected" && statusFilter === "Confirmed")
          ? "left"
          : (previousFilter === "Confirmed" && (statusFilter === "Pending" || statusFilter === "Rejected")) ||
            (previousFilter === "Pending" && statusFilter === "Rejected")
          ? "right"
          : "left"; 
  
      setSlideDirection(direction);

      setIsSliding(true);
  
      setTimeout(() => {
        setDisplayedEvents(events.filter((event) => event.status === statusFilter));
        setIsSliding(false); 
        setPreviousFilter(statusFilter); 
      }, 100); 
    }
  }, [statusFilter, previousFilter]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 md:mb-8 text-gray-800">My Tickets</h1>

        {/* Search and Filter */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-4 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
                className="pl-10 bg-white border-gray-200"
              />
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
              <Select>
                <SelectTrigger className="w-[180px] bg-white border-gray-200">
                  <SelectValue placeholder="Sort by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="bg-white" value="date-asc">Date (Ascending)</SelectItem>
                  <SelectItem className="bg-white" value="date-desc">Date (Descending)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
            {["Confirmed", "Pending", "Rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className={`${
                  statusFilter === status
                    ? "bg-gray-900 text-white "
                    : "bg-background text-foreground transition-colors hover:bg-gray-100"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
        {/* Event Cards with sliding animation */}
        <div
          className={`space-y-4 md:space-y-6 transition-transform duration-500 ${
            isSliding
              ? slideDirection === "left"
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          {displayedEvents.map((event) => (
            <EventTickets key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

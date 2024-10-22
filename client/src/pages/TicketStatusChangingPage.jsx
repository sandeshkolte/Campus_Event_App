"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Image, MapPin } from "lucide-react";

const initialTickets = [
  {
    id: 1,
    userName: "John Doe",
    userImage: "https://i.pravatar.cc/150?img=1",
    price: 99.99,
    status: "Pending",
  },
  {
    id: 2,
    userName: "Jane Smith",
    userImage: "https://i.pravatar.cc/150?img=2",
    price: 79.99,
    status: "Pending",
  },
  {
    id: 3,
    userName: "Bob Johnson",
    userImage: "https://i.pravatar.cc/150?img=3",
    price: 89.99,
    status: "Pending",
  },
  {
    id: 4,
    userName: "Alice Brown",
    userImage: "https://i.pravatar.cc/150?img=4",
    price: 109.99,
    status: "Pending",
  },
  {
    id: 5,
    userName: "Charlie Davis",
    userImage: "https://i.pravatar.cc/150?img=5",
    price: 69.99,
    status: "Pending",
  },
  {
    id: 6,
    userName: "Eva Wilson",
    userImage: "https://i.pravatar.cc/150?img=6",
    price: 119.99,
    status: "Pending",
  },
];

const EventCard = ({ event }) => (
  <Card className="overflow-hidden bg-white mb-4 transition-shadow duration-300 hover:shadow-lg">
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-48 h-48 relative">
        <img
          src={
            event.image ||
            "https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwAAAA?rs=1&pid=ImgDetMain"
          }
          alt={event.title}
          className="w-full h-full object-cover"
          width={192}
          height={192}
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {event.status}
        </Badge>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4 flex-grow">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {event.date}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {event.location}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Tickets Sold
              </span>
              <span className="text-sm font-medium text-gray-800">
                {event.soldTickets}/{event.totalTickets}
              </span>
            </div>
            {/* //progressbar */}
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-black rounded"
                style={{
                  width: `${(event.soldTickets / event.totalTickets) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  </Card>
);

const TicketCard = ({ ticket, onStatusChange }) => {
  return (
    <div className="w-full mx-auto">
      {/* List view for small screens */}
      <div className="md:hidden">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="flex items-start p-2 pt-3 border-b">
            <img
              src={ticket.userImage}
              alt={ticket.userName}
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {ticket.userName}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm font-medium text-gray-800">
                  ${ticket.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 flex gap-2">
            <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 mb-2">
              Show Screenshot
              <Image className="w-4 h-4 ml-2" />
            </Button>
            <Select onValueChange={(value) => onStatusChange(ticket.id, value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={ticket.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirm Ticket</SelectItem>
                <SelectItem value="Rejected">Reject Ticket</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Card view for medium and large screens */}
      <Card className="hidden md:block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <div className="flex">
          {/* User Image */}
          <div className="w-20 h-20 p-2 relative">
            <img
              src={ticket.userImage}
              alt={ticket.userName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-1 justify-between items-center gap-5 p-4">
            {/* Left Section */}
            <div className="flex flex-col gap-2">
              <CardHeader className="p-0">
                <CardTitle className="text-lg font-bold text-gray-800">
                  {ticket.userName}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <span className="font-medium text-gray-800">
                    ${ticket.price.toFixed(2)}
                  </span>
                </p>
              </CardHeader>
            </div>

            {/* Right Section */}
            <CardContent className="p-0 flex items-center gap-5">
              <Button className="bg-gray-800 text-white hover:bg-gray-700 text-sm">
                Show Screenshot
                <Image className="w-4 h-4 ml-2" />
              </Button>

              <Select
                onValueChange={(value) => onStatusChange(ticket.id, value)}
              >
                <SelectTrigger className="w-[180px] text-sm">
                  <SelectValue placeholder={ticket.status} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Confirmed">Confirm Ticket</SelectItem>
                  <SelectItem value="Rejected">Reject Ticket</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function TicketStatusChangingPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    filterTickets(statusFilter);
  }, [statusFilter, tickets]);

  const filterTickets = (status) => {
    setIsSliding(true);
    setTimeout(() => {
      setDisplayedTickets(tickets.filter((ticket) => ticket.status === status));
      setIsSliding(false);
    }, 300);
  };

  const handleStatusChange = (id, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 md:mb-8 text-gray-800">
          Tickets Payments Verification
        </h1>

        <Card className="bg-white rounded-lg shadow-md p-2 sm:p-4 md:p-6 mb-4 md:mb-8">
          <EventCard
            event={{
              title: "Summer Music Festival",
              image:
                "https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwAAAA?rs=1&pid=ImgDetMain",
              status: "Active",
              date: "August 15-17, 2024",
              location: "Central Park, New York",
              soldTickets: 1500,
              totalTickets: 2000,
            }}
          />
          <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
            {["Pending", "Confirmed", "Rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                className={`${
                  statusFilter === status
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </Card>

        <div
          className={`space-y-4 transition-all duration-300 ${
            isSliding
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {displayedTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

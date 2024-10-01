import React from "react";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const EventTickets = ({ event }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            width={192}
            height={192}
          />
          <Badge
            className={`absolute top-2 right-2 ${getStatusColor(event.status)}`}
          >
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
                  {event.ticketsSold}/{event.totalTickets}
                </span>
              </div>
              <Progress
                value={(event.ticketsSold / event.totalTickets) * 100}
                className="h-2 bg-gray-200"
              />
            </div>
          </CardContent>
          <CardFooter className="p-0 mt-4">
            {event.status === "Confirmed" && (
              <Button className="w-full sm:w-auto bg-gray-800 text-white hover:bg-gray-700">
                View Ticket
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default EventTickets;

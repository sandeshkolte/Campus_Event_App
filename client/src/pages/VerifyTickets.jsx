import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { baseUrl } from "@/common/common";
import { toast } from "react-toastify";

export default function VerifyTickets() {
  const events = useSelector((state) => state.event.activeEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const confirmStatusChange = async () => {
    try {
      const result = await axios.post(`${baseUrl}/api/event/update/${selectedEventId}`, {
        isActive: false,
      });

      console.log(result);
      toast.success("Event closed successfully");
      setIsDialogOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Error updating event status");
      setIsDialogOpen(false);
    }
  };

  const handleSelectChange = (value, eventId) => {
    if (value === "closed") {
      setSelectedEventId(eventId);
      setIsDialogOpen(true);
    }
  };

  // Filter events based on search input
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-6xl mx-auto p-4 bg-white text-gray-900 cursor-pointer">
      <div className="flex justify-center mb-10">
        <div className="bg-zinc-950 w-fit text-gray-300 p-3 rounded-2xl text-center mt-5">
          <h3 className="font-light text-2xl md:mx-10">Verify Payment</h3>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search events"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredEvents.map((event) => (
          <Card
            key={event._id}
            className="flex flex-col sm:flex-row items-center"
            onClick={() => navigate(`/event/${event._id}`)}
          >
            <div className="w-full sm:w-24 h-24 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-fit"
                width={80}
                height={80}
              />
              <Badge
                className={`absolute top-1 right-1 ${
                  event.isActive ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {event.isActive ? "Active" : "Closed"}
              </Badge>
            </div>

            <CardHeader className="flex-1">
              <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(event.startDate).toLocaleString("en-US", {
                  weekday: "short",
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                · {event.venue}
              </p>
              <p className="text-sm text-gray-500">
                {`${event.participants?.filter((p) => p.paymentStatus === "Confirmed").length || 0} / 
                ${event.participants?.length || 0} tickets sold`}
              </p>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-2">
              <Badge
                variant="secondary"
                className={`mb-1 ${
                  event.participants?.some((p) => p.paymentStatus === "Pending")
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }`}
              >
                {event.participants?.some((p) => p.paymentStatus === "Pending")
                  ? `${event.participants.filter((p) => p.paymentStatus === "Pending").length} pending`
                  : "No Pending Requests"}
              </Badge>

              <Select onValueChange={(value) => handleSelectChange(value, event._id)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={event.isActive ? "Active" : "Closed"} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Event Closure</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this event? This action will make the event inactive and may affect current participants.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmStatusChange}>
              Close Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

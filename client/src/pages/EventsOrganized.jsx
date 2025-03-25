import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditIcon, Search, Trophy, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { WinnerDeclarationPopup } from "@/components/WinnerDeclarationPopup";
import WinnersPopover from "@/components/WinnersPopover";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShowWinnersSwitch } from "@/components/utils/ShowWinnerSwitch";
import CertificateGeneratorDialog from "@/components/CerticateIssuesPage";
import { ParticipantsListPopup } from "@/components/ParticipantsListPopup";

export default function EventsOrganized() {
  const events = useSelector((state) => state.event?.myOrganizedEvents);

  // State for filtering events by "Active" or "Closed"
  const [statusFilter, setStatusFilter] = useState("Active");
  const filteredEvents = events?.filter((event) =>
    statusFilter === "Active" ? event.isActive : !event.isActive
  );

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

      {/* Buttons for filtering */}
      <div className="flex gap-4 mb-6">
        {["Active", "Closed"].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            className={`${
              statusFilter === status
                ? "bg-gray-900 text-white"
                : "bg-background text-foreground transition-colors hover:bg-gray-100"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Filtered events */}
      <div className="space-y-4">
        {filteredEvents?.map((event) => (
          <Card
            key={event._id}
            className="flex flex-col sm:flex-row items-center relative"
          >
            <div className="w-full sm:w-24 h-24 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
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
            <CardContent className="flex flex-wrap items-center gap-4">
              {/* Conditionally Render Buttons */}
              {event.isActive ? (
                <Link
                  to={`/update/${event._id}`}
                  className="flex border-gray-100 border-2 items-center gap-2 p-2 rounded-md"
                >
                  <EditIcon className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              ) : (
                <>
                  <ParticipantsListPopup event={event} />
                  <WinnerDeclarationPopup event={event} />
                  <CertificateGeneratorDialog event={event}/>
                </>
              )}
            </CardContent>
            {event.winner && event.winner.length > 0 && (
              <>
                <div className="md:absolute top-1 right-1">
                  <WinnersPopover organisedEvent={event} />
                </div>
                <div className="md:absolute bottom-1 right-1">
                  <ShowWinnersSwitch event={event} />
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}


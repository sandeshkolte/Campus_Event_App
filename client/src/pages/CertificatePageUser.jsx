"use client";

import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CertificateCard from "@/components/CertificateCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CertificatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const user = useSelector((state) => state.auth?.userInfo?.myevents);
  const myActiveTickets = useSelector((state) => state.event?.events);

  // Memoize combined details to avoid unnecessary re-renders
  const combinedDetails = useMemo(() => {
    return user
      ?.map((paymentEvent) => {
        const matchedEvent = myActiveTickets?.find(
          (activeEvent) => activeEvent._id === paymentEvent.eventId
        );

        if (matchedEvent) {
          return {
            ...matchedEvent,
            paymentStatus: paymentEvent.paymentStatus,
            paymentScreenshot: paymentEvent.paymentScreenshot,
          };
        }
        return null;
      })
      .filter((event) => event !== null);
  }, [user, myActiveTickets]);

  // State for displayed events
  const [displayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    setDisplayedEvents(
      combinedDetails?.filter(
        (event) => event.paymentStatus === "Confirmed" && event.isCertificateEnabled
      ) || []
    );
  }, [combinedDetails]);
  
  // Filter events based on search term
  const filteredEvents = useMemo(() => {
    return displayedEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [displayedEvents, searchTerm]);

  // Sort events based on selected criteria
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "venue") {
        return a.venue.localeCompare(b.venue);
      }
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return dateA - dateB;
    });
  }, [filteredEvents, sortBy]);

  console.log(sortedEvents);

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
              <CertificateCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

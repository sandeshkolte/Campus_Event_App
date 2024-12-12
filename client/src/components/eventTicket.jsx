import React, { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
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
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import crypto from "crypto-js";

const EventTickets = ({ event }) => {
  const user = useSelector((state) => state.auth?.userInfo);
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

  const ticketRef = useRef(null);

  // Generate a stable unique ID based on user and event data
  const generateUniqueId = () => {
    if (!user || !event) return "unknown-id";
    const rawString = `${user._id}-${event._id}`;
    return crypto.MD5(rawString).toString(); // Hash the user-event combination
  };

  const uniqueId = generateUniqueId();

  const handleDownload = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,  // This allows cross-origin images to be captured
        onclone: (clonedDoc) => {
          // Find the event image in the cloned document
          const img = clonedDoc.querySelector('img[alt="Event banner"]');
          if (img) {
            // Set crossOrigin to anonymous to avoid CORS issues
            img.crossOrigin = "anonymous";
            // Ensure the image is loaded before capturing
            return new Promise((resolve) => {
              img.onload = resolve;
              img.src = img.src;
            });
          }
        }
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "bloggers-table-ticket.png";
      link.click();
    }
  };


  console.log("this the event", event);
  // qrCode deatils information

  const qrData = {
    eventId: event?._id,
    eventTitle: event?.title,
    userId: user?._id,
    userName: `${user?.firstname} ${user?.lastname}`,
    venue: event?.venue,
    ParticipantSize: event?.participantSize,
    date: new Date(event.startDate).toISOString(),
  };

  const formattedString = `
Event ID: ${qrData.eventId}
Event Title: ${qrData.eventTitle}
User Name: ${qrData.userName}
Venue: ${qrData.venue}
Participant Size: ${qrData.ParticipantSize}
Date: ${new Date(qrData.date).toLocaleString()}
`;

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
                {new Date(event?.startDate).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {event.venue}
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
            {event.paymentStatus === "Confirmed" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto bg-gray-800 text-white hover:bg-gray-700"
                    variant="outline"
                  >
                    View Ticket
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-80">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <div
                    ref={ticketRef}
                    className="bg-white p-4 rounded-lg font-sans"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-1/3 mr-4">
                        <img
                          src={event?.image}
                          alt="Event banner"
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{event?.title}</h2>
                        <p className="text-sm text-gray-600">Member Name:</p>
                        <p className="font-semibold">
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold">
                          {new Date(event?.startDate).toLocaleString("en-Us", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time</span>
                        <span className="font-semibold">
                          {new Date(event?.startDate).toLocaleString("en-Us", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Admit</span>
                        <span className="font-semibold">
                          {event?.participantSize} only
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-semibold">{event?.venue}</p>
                    </div>
                    <div className="flex justify-center mb-2">
                      <QRCodeSVG value={formattedString} size={128} />
                    </div>
                    <p className="text-xs text-center text-gray-500">
                      BOOKING ID - {uniqueId}
                    </p>
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="w-full sm:w-auto bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Download Ticket
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default EventTickets;

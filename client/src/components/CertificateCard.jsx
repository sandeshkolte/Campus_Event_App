"use client"

import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function CertificateCard({ event }) {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:flex-shrink-0 sm:w-48 h-48 sm:h-32 relative">
            <Badge variant={event.status === "Active" ? "success" : "secondary"} className="absolute top-2 left-2 z-10">
              {event.status}
            </Badge>
            <img className="w-full h-full object-cover" src={event.image || "/placeholder.svg"} alt={event.title} />
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <div className="mt-1 text-sm text-gray-500 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{event.time}</span>
                  <span className="mx-1">·</span>
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{event.location}</span>
                </div>
                {event.ticketsSold && <p className="mt-1 text-sm text-gray-500">Tickets sold successfully</p>}
              </div>
              <div className="flex flex-col mt-4 sm:mt-0">
                <Button size="sm" onClick={() => setShowCertificate(true)} className="whitespace-nowrap text-white bg-gray-900">
                  Show Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Certificate</DialogTitle>
          </DialogHeader>
          <div className="p-6 flex flex-col items-center">
            <div className="border-4 border-double border-primary/20 p-8 w-full text-center">
              <h2 className="text-2xl font-serif mb-4">Certificate of Participation</h2>
              <p className="mb-6">This certifies that the bearer participated in</p>
              <p className="text-xl font-bold mb-6">{event.title}</p>
              <p className="italic mb-8">Held on {new Date(event.date).toLocaleDateString()}</p>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm">Event Organizer Signature</p>
              </div>
            </div>
            <Button className="mt-4" onClick={() => window.print()}>Print Certificate</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CertificateCard;

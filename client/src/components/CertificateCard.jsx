"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Printer, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSelector } from "react-redux";

export default function CertificateCard({ event }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);
  const certificateRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const updateScaleFactor = () => {
      if (certificateRef.current) {
        const { width } = certificateRef.current.getBoundingClientRect();
        setScaleFactor(width/600); // Assuming 800px is the base width of the certificate
      }
    };
    updateScaleFactor();
    window.addEventListener("resize", updateScaleFactor);
    return () => window.removeEventListener("resize", updateScaleFactor);
  }, []);

  const generateCertificateNumber = () => {
    const eventCode = event._id.slice(-4); // Last 4 characters of event ID
    const userCode = user._id.slice(-4); // Last 4 characters of user ID
    const timestamp = new Date().getTime().toString().slice(-4); // Last 4 digits of timestamp
    return `CERT-${eventCode}-${userCode}-${timestamp}`;
  };
  

  const handlePrintCertificate = () => {
    const certificateElement = document.getElementById("certificate-content");
    if (certificateElement) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
        <html>
          <head>
            <title>Certificate - ${event.title}</title>
            <style>
              body { margin: 0; padding: 0; background-color: white; }
              .certificate-container { display: flex; justify-content: center; align-items: center; height: 100vh; }
              .certificate-content img { width: 100%; height: auto; display: block; }
              .certificate-field { position: absolute; transform: translate(-50%, -50%); font-weight: bold; text-align: center; }
              @media print { @page { size: landscape; margin: 0; } body { margin: 0; overflow: hidden; } }
            </style>
          </head>
          <body>
            <div class="certificate-container">
              <div class="certificate-content">
                <img src="${event.certificateTemplate?.backgroundImage || '/placeholder.svg'}" alt="Certificate Background"/>
                ${event.certificateTemplate?.fields?.map(field => {
                  const fieldValue = field.value.replace("{participant.name}", `${user.firstname} ${user.lastname}`)
                                              .replace("{certificateNumber}", generateCertificateNumber());
                  return `<div class="certificate-field" style="top: ${field.position.y}%; left: ${field.position.x}%; font-size: ${field.size * scaleFactor*2.5}px; color: ${field.color || '#000'};">${fieldValue}</div>`;
                }).join('') || ''}
              </div>
            </div>
            <script>window.onload = function() { setTimeout(() => { window.print(); setTimeout(() => { window.close(); }, 500); }, 1000); };</script>
          </body>
        </html>
      `);
        printWindow.document.close();
      }
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 sm:h-32 relative">
            <Badge variant={event.status === "Active" ? "success" : "secondary"} className="absolute top-2 left-2 z-10">
              {event.status}
            </Badge>
            <img className="w-full h-full object-cover" src={event.image || "/placeholder.svg"} alt={event.title} />
          </div>
          <div className="flex justify-between w-full p-4 sm:p-6">
            <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <div className="mt-1 text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
              <span className="mx-1">·</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.venue}</span>
            </div>
            </div>
           
            <div>
            <Button size="sm" onClick={() => setShowCertificate(true)} className="mt-4 text-white bg-gray-900">Show Certificate</Button>
            </div>
           
          </div>
        </div>
      </div>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Certificate</DialogTitle>
          </DialogHeader>
          <div className="p-6 flex flex-col items-center">
            {event.certificateTemplate?.backgroundImage ? (
              <div id="certificate-content" ref={certificateRef} className="relative border-4 p-4">
                <img src={event.certificateTemplate.backgroundImage} alt="Certificate Template" className="w-full" />
                {event.certificateTemplate.fields?.map((field) => (
                  <div key={field.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold"
                    style={{ top: `${field.position.y}%`, left: `${field.position.x}%`, fontSize: `${field.size * scaleFactor/1}px`, color: field.color || "#000" }}>
                    {field.value.replace("{participant.name}", `${user.firstname} ${user.lastname}`).replace("{certificateNumber}", generateCertificateNumber())
                  }
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-destructive">Certificate template not available</p>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={handlePrintCertificate} disabled={!event.certificateTemplate?.backgroundImage}>
                <Printer className="mr-2" /> Print Certificate
              </Button>
              <Button variant="outline" disabled={!event.certificateTemplate?.backgroundImage}>
                <Download className="mr-2" /> Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

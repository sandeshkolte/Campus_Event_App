"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useSelector } from "react-redux"

export default function CertificateCard({ event }) {
  const [showCertificate, setShowCertificate] = useState(false)
  const user = useSelector((state) => state.auth.userInfo)
  const certificateRef = useRef(null)
  const [scaleFactor, setScaleFactor] = useState(1)

  // console.log(user)

  useEffect(() => {
    const updateScaleFactor = () => {
      if (certificateRef.current) {
        const { width } = certificateRef.current.getBoundingClientRect()
        // Base the scale factor on the container width relative to a standard certificate width
        // Using 800 as the base width for better scaling on larger screens
        setScaleFactor(Math.min(width / 800, 1.2)) // Cap the scale factor to prevent overly large text
      }
    }

    // Initial calculation
    if (showCertificate) {
      // Use setTimeout to ensure the dialog is fully rendered
      const timer = setTimeout(updateScaleFactor, 100)
      return () => clearTimeout(timer)
    }
  }, [showCertificate])

  // Update scale factor on window resize when certificate is shown
  useEffect(() => {
    const updateScaleFactor = () => {
      if (certificateRef.current && showCertificate) {
        const { width } = certificateRef.current.getBoundingClientRect()
        setScaleFactor(Math.min(width / 800, 1.2))
      }
    }

    window.addEventListener("resize", updateScaleFactor)
    return () => window.removeEventListener("resize", updateScaleFactor)
  }, [showCertificate])

  const generateCertificateNumber = () => {
    const eventCode = event._id.slice(-4) // Last 4 characters of event ID
    const userCode = user._id.slice(-4) // Last 4 characters of user ID
    const timestamp = new Date().getTime().toString().slice(-4) // Last 4 digits of timestamp
    return `CERT-${eventCode}-${userCode}-${timestamp}`
  }

  const handleDownloadCertificate = async () => {
    if (!event.certificateTemplate?.backgroundImage) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Load the background image
    const img = new Image()
    img.crossOrigin = "anonymous" // To avoid CORS issues

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Add text fields
      if (event.certificateTemplate.fields) {
        event.certificateTemplate.fields.forEach((field) => {
          const fieldValue = field.value
            .replace("{participant.name}", `${user.firstname} ${user.lastname}`)
            .replace("{certificateNumber}", generateCertificateNumber())

          // Calculate position
          const x = (field.position.x / 100) * canvas.width
          const y = (field.position.y / 100) * canvas.height

          // Set text properties
          ctx.font = `${field.size * 4}px bold Arial`
          ctx.fillStyle = field.color || "#000"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Draw text
          ctx.fillText(fieldValue, x, y)
        })
      }

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png")

      // Create download link
      const downloadLink = document.createElement("a")
      downloadLink.href = dataUrl
      downloadLink.download = `${event.title}_Certificate.png`

      // Trigger download
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

    // Set source of image
    img.src = event.certificateTemplate.backgroundImage
  }

  return (
    <>
      <div className="bg-card rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-40 sm:h-32 md:h-40 relative">
            <Badge variant={event.status === "Active" ? "success" : "secondary"} className="absolute top-2 left-2 z-10">
              {event.status}
            </Badge>
            <img className="w-full h-full object-cover" src={event.image || "/placeholder.svg"} alt={event.title} />
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full p-4 sm:p-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">{event.title}</h3>
              <div className="mt-1 text-xs sm:text-sm flex flex-wrap items-center">
                <span className="flex items-center mr-2 mb-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center mb-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">{event.venue}</span>
                </span>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 self-start sm:self-center">
              <Button
                size="sm"
                onClick={() => setShowCertificate(true)}
                className="text-white bg-gray-900 w-full sm:w-auto"
              >
                Show Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Certificate</DialogTitle>
          </DialogHeader>
          <div className="p-2 sm:p-4 md:p-6 flex flex-col items-center">
            {event.certificateTemplate?.backgroundImage ? (
              <div
                id="certificate-content"
                ref={certificateRef}
                className="relative border-2 sm:border-4 p-2 sm:p-4 w-full"
              >
                <img
                  src={event.certificateTemplate.backgroundImage || "/placeholder.svg"}
                  alt="Certificate Template"
                  className="w-full"
                />
                {event.certificateTemplate.fields?.map((field) => {
                  // Calculate responsive font size based on field size and scale factor
                  // Using a more balanced approach for different screen sizes
                  const fontSize = field.size * scaleFactor

                  return (
                    <div
                      key={field.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold text-center"
                      style={{
                        top: `${field.position.y}%`,
                        left: `${field.position.x}%`,
                        fontSize: `${fontSize}px`,
                        color: field.color || "#000",
                        // Add max-width to prevent text overflow
                        maxWidth: "80%",
                        // Add text shadow for better visibility on various backgrounds
                        textShadow:
                          field.color === "#fff" || field.color === "white" ? "0px 0px 2px rgba(0,0,0,0.5)" : "none",
                      }}
                    >
                      {field.value
                        .replace("{participant.name}", `${user.firstname} ${user.lastname}`)
                        .replace("{certificateNumber}", generateCertificateNumber())}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-destructive">Certificate template not available</p>
            )}
            <div className="flex justify-center mt-4 w-full">
              <Button
                onClick={handleDownloadCertificate}
                disabled={!event.certificateTemplate?.backgroundImage}
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" /> Download Certificate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


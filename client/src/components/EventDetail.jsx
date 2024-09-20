import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "@/common/common"
import React from "react"

export default function EventDetail() {
  const { id } = useParams()
  const [eventDetails, setEventDetails] = React.useState(null)

  React.useEffect(() => {
    try {
      axios.get(baseUrl + `/api/event/details?id=${id}`).then((result) => {
        console.log(result.data.event)
        setEventDetails(result.data.event)
      })
    } catch (err) {
      console.log(err)
    }
  }, [id])

  if (!eventDetails) {
    return <div className="flex justify-center">Loading...</div>
  }

  return (
    <div className='flex justify-center bg-indigo-50'>
    <Card className="w-full max-w-6xl outline-transparent">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5">
          <div className="relative aspect-[4/3] flex items-center justify-center">
         <img src={eventDetails.image} alt="image" loading="lazy" className="object-cover  " />
             {/* <div className="relative text-white text-center z-10">
              <div className="mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">ReactDay</h2>
              <p className="text-xl">.berlin</p>
            </div> */}
          </div>
        </div>
        <CardContent className="w-full md:w-3/5 p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{eventDetails.title}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">  {eventDetails.price === '0' ? 'FREE' : `$${eventDetails.price}`}</Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 font-semibold">{eventDetails.category}</Badge>
                <span className="text-sm text-purple-600 font-semibold ">{eventDetails.coordinator}</span>
              </div>
              <Button className="bg-indigo-500 hover:bg-indigo-600 rounded-full text-white my-3">
                Buy Ticket
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-2 text-orange-500" />
                {new Date(eventDetails.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 mr-2 text-orange-500" />
                {eventDetails.venue}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What You'll Learn:</h3>
              <p className="text-sm text-gray-600">
               {eventDetails.description}</p>
            </div>
            {/* <a href="https://reactday.berlin" className="text-blue-600 hover:underline text-sm">
              https://reactday.berlin
            </a> */}
          </div>
        </CardContent>
      </div>
    </Card>
    </div>
  )
}
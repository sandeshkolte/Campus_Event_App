import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EventCard({ event }) {
  return (
    <Card className="w-[300px] overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-400 cursor-pointer">
      <div className="relative h-[200px] bg-slate-900">
        <img
          src={event.image}
          alt={event.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{event.title}</h2>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">
            {String(event.price) === '0'|| '' ? 'FREE' : `$${event.price}`}
          </Badge>
          <Badge variant="secondary" className="bg-slate-100 text-gray-800">
            {event.category || 'Cultural'} {/* Assuming there's a category field */}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {new Date(event.date).toLocaleString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
          })}
        </p>
        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.venue}</p>
      </CardContent>
    </Card>
  )
}

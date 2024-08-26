import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <Card className="w-[300px] overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="relative h-[200px] bg-slate-900">
        <img
          src="/placeholder.svg?height=200&width=300"
          alt="Culture Day"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">CULTURE DAY</h2>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">FREE</Badge>
          <Badge variant="secondary" className="bg-slate-100 text-gray-800">Cultural</Badge>

        </div>
        <p className="text-sm text-gray-600 mb-2">Fri, Dec 15, 7:00 AM</p>
        <h3 className="text-xl font-semibold mb-1">Group Dance</h3>
        <p className="text-sm text-gray-600">GCOEC</p>
      </CardContent>
    </Card>
  )
}
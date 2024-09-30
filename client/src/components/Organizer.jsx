import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function Component({ name, year, branch, contactNumber }) {
  return (
    <Card className="max-w-sm bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl overflow-hidden transform transition-all duration-300">
      <div className="flex px-4 pt-4 pb-2 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <Avatar className="w-14 h-14 mr-4 rounded-full">
          <AvatarImage src="https://th.bing.com/th/id/OIP.SsuAjOuhzPAUdg5ndn--wQHaJJ?rs=1&pid=ImgDetMain" alt="Alex Morrison" className="object-cover" />
          <AvatarFallback className="text-xl font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600">AM</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Alex Morrison</h2>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:shadow-lg">
            Event Organizer
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white bg-opacity-70 p-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-opacity-90">
            <p className="text-gray-500 text-xs">Year of Study</p>
            <p className="font-bold text-indigo-700">4 Year</p>
          </div>
          <div className="bg-white bg-opacity-70 p-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-opacity-90">
            <p className="text-gray-500 text-xs">Branch</p>
            <p className="font-bold text-indigo-700">CSE</p>
          </div>
          <div className="bg-white bg-opacity-70 col-span-2 p-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-opacity-90">
            <p className="text-gray-500 text-xs">Contact Number</p>
            <p className="font-bold text-indigo-700">+1 234 567 8900</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

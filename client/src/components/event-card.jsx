import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function BranchCard({title}) {
  return (
    <Card className="w-[200px] max-w-sm overflow-hidden">
        <div className="relative h-[100px] bg-slate-900 mb-2" >

      <img
        alt="Event cover image"
        className="w-full h-32 object-cover"
        height="100"
        src="https://wallpapercave.com/wp/VmZHnTO.jpg"
        style={{
          aspectRatio: "2/1",
          objectFit: "cover",
        }}
        width="400"
      />
       <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{title}</h2>
        </div>
        </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Bringing innovation and collaboration to life—organized by the ACSES Committee.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gray-950 text-white" >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Show Events
        </Button>
      </CardFooter>
    </Card>
  )
}
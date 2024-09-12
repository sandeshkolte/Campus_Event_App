import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function BranchCard() {
  return (
    <Card className="w-[300px] max-w-sm overflow-hidden">
        <div className="relative h-[200px] bg-slate-900" >

      <img
        alt="Event cover image"
        className="w-full h-48 object-cover"
        height="200"
        src="/placeholder.svg?height=200&width=400"
        style={{
          aspectRatio: "400/200",
          objectFit: "cover",
        }}
        width="400"
      />
       <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">CSE</h2>
        </div>
        </div>
      <CardHeader>
        <CardTitle>CSE</CardTitle>
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
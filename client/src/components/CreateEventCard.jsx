import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  return (
    <Card className="w-full max-w-6xl mx-auto ">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>Fill in the details for your new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter event title" className="outline-none"  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your event" rows={4} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Upload Image</Label>
              <Input id="image" type="file" accept="image/*" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coordinator">Coordinator</Label>
              <Select>
                <SelectTrigger id="coordinator">
                  <SelectValue placeholder="Select coordinator" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" placeholder="Enter event venue" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gray-950 text-white" >Create Event</Button>
      </CardFooter>
    </Card>
  )
}
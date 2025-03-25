"use client"

import { useState } from "react"
import axios from "axios"
import { baseUrl } from "@/common/common"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Search, User, GraduationCap, BookOpen } from "lucide-react"

export function ParticipantsListPopup({ event }) {
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchParticipants = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/api/user/get-allparticipants/${event._id}`)
      console.log("Participants:", res.data.response)
      setParticipants(res.data.response)
    } catch (error) {
      console.error("Error fetching participants", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredParticipants = participants.filter(
    (p) =>
      p.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.branch?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getInitials = (firstname, lastname) => {
    return `${firstname?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-300 border" onClick={fetchParticipants}>
          {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <User className="h-4 w-4 mr-2" />}
          Show Participants
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{event.title} Participants</DialogTitle>
        </DialogHeader>

        <div className="relative mb-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[300px] px-2">
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filteredParticipants.length > 0 ? (
            <ul className="divide-y">
              {filteredParticipants.map((p, index) => (
                <li key={index} className="p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(p.firstname, p.lastname)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {p.firstname} {p.lastname}
                      </p>
                      <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                        <div className="flex justify-start gap-3">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{p.branch}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            <span>{p.yearOfStudy} Year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-20 text-center p-4">
              <p className="text-sm text-muted-foreground">
                {participants.length === 0 ? "No participants found." : "No matching results."}
              </p>
              {searchQuery && (
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              )}
            </div>
          )}
        </ScrollArea>

        {filteredParticipants.length > 0 && (
          <div className="p-3 border-t text-xs text-muted-foreground">
            Showing {filteredParticipants.length} of {participants.length} participants
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

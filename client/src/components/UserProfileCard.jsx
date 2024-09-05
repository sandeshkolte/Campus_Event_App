import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AtSignIcon, MailIcon, UserIcon } from "lucide-react"

export default function UserProfileCard({user}) {

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage alt={`${user.username}'s avatar`} src={user.image} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold">{user.fullname}</h2>
        {user.isAdmin && (
          <Badge className="mt-2 " variant="secondary">
            Admin
          </Badge>
        ) ||  <Badge className="mt-2 bg-gray-100" variant="">
        Student
      </Badge>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <AtSignIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Username</p>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm text-muted-foreground">{user.fullname}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MailIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
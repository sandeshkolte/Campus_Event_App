import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AtSignIcon, MailIcon, UserIcon } from "lucide-react"
import AlertComponent from "./alert-dialog"

export default function UserProfileCard({user}) {

  return (
    <Card className="w-[350px] relative group">
      {/* The group class is used to apply hover styles to child elements */}
      <CardHeader className="flex flex-col items-center">
        {/* Edit button, hidden by default and shown on hover */}
        {/* <div className="absolute top-0 right-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white px-3 py-1 rounded-md">
        </div> */}
        
        {/* <Button className="absolute top-0 right-0 m-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 shadow-2xl shadow-black cursor-default" onClick={handleLogout} >Logout</Button> */}
        
        <AlertComponent  title="Logout" />

        <Avatar className="h-24 w-24">
          <AvatarImage alt={`${user.username}'s avatar`} src={user.image} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold">{user.fullname}</h2>
        {
          (user.role === "superadmin") && (
            <Badge className="mt-2 bg-rose-500 text-white" variant="secondary">
              Super Admin
            </Badge>
          ) ||
          (user.role === "admin") && (
            <Badge className="mt-2 bg-amber-300" variant="secondary">
              Admin
            </Badge>
          ) ||
          <Badge className="mt-2 bg-cyan-500 text-white" variant="secondary">
            Student
          </Badge>
        }
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
  );
}

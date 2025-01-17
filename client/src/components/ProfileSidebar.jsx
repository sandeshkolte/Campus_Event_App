import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '@/store/authSlice'
import { toggleSidebar } from '@/store/navSlice'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LogOut, User, Ticket, History, Award, Home, ChevronRight, PenBox, StarIcon, CheckSquare, Trophy } from 'lucide-react'
import AlertComponent from './alert-dialog'
import { FcPhotoReel } from 'react-icons/fc'
import { TbPhoto } from 'react-icons/tb'
import NotificationComponent from './utils/NotificationComponent'


export default function ProfileSidebar() {
  const dispatch = useDispatch()
  const sidebar = useSelector((state) => state.nav.sidebar)
  // const navigate = useNavigate()
  const userInfo = useSelector((state) => state.auth?.userInfo);


  // Handle link clicks to navigate to different pages
  const handleLinkClick = () => {
    // navigate(path)
    if (sidebar) {
      dispatch(toggleSidebar()) // Close sidebar only on small screens
    }
  }

  // Define navigation items for the sidebar
  const NavItem = ({ icon: Icon, children, path }) => (
    <NavLink
      className={({ isActive }) =>
        `w-full  justify-start text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200 ${
          isActive ? "text-blue-500 bg-blue-50 font-bold" : ""
        }`
      }
      onClick={() => handleLinkClick()}
      to={path}
    >
      <div className='flex py-2'>
        <Icon className="mr-2 h-5 w-5" />
        <span className="flex-grow text-left">{children}</span>
        <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </NavLink>
  );

  // Sidebar content that appears both in the sheet and as a static sidebar
  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-4">
        <div className='flex group py-2' >
                 <NotificationComponent/>
                 </div>
          <NavItem icon={User} path="/profile">User Profile</NavItem>
          {/* <NavItem icon={User} path="/profile">User Profile</NavItem> */}
          {(userInfo?.role === "admin" || userInfo?.role==="superadmin") && (
            <>
          <NavItem icon={PenBox} path="/create">Create Event</NavItem>
          <NavItem icon={CheckSquare} path="/verifytickets">Verify Tickets</NavItem>
          <NavItem icon={StarIcon} path="/organized">Events Organised</NavItem>
          </>
          ) }
          <NavItem icon={TbPhoto} path="/gallery">Photo Gallery</NavItem>
          <NavItem icon={Ticket} path="/mytickets">My Tickets</NavItem>
          <NavItem icon={Trophy} path="/winners">Winners</NavItem>
          {/* <NavItem icon={History} path="/">History</NavItem>
          <NavItem icon={Award} path="/">Certificate</NavItem> */}
          <NavItem icon={Home} path="/" className="lg:hidden">Home</NavItem>
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-2 ">
        <div 
          // variant="destructive" 
          className="w-full p-2 rounded-md flex items-center group hover:bg-sky-50 hover:text-blue-500 transition-colors duration-200"
          // onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          <AlertComponent title='Sign Out' />
          <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Sheet for small screens, opening from the right side */}
      <Sheet open={sidebar} onOpenChange={() => dispatch(toggleSidebar())}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 border-l shadow-lg">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {/* content */}
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Static sidebar for larger screens */}
      <aside className="hidden lg:block bg-white w-80 max-h-screen border-r shadow-lg">
        <SidebarContent />
      </aside>
    </>
  )
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, LogOut, Menu, Zap } from 'lucide-react'; // Adjust the import based on your icon library
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



const NavItem = ({ icon: Icon, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center justify-center p-3 rounded-full ${
        isActive ? "text-gray-200 bg-gray-800" : "text-gray-700 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 hover:text-gray-200 hover:bg-gray-900 transition-colors duration-500"
      }`
    }
  >
    <Icon className="h-4 w-4" />
  </NavLink>
);

const AdminSidebar = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-between'>
      <div className='' >
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      
    <NavItem icon={Menu} path="/admin" />
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white"  >
      <p>Menu</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

      </div>
      <ul className='flex flex-col items-center space-y-4'>
        <li className=''>
          <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      
    <NavItem icon={Home} path="/superadmin" />
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white"  >
    <p>Home</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
        </li>
        <li className=''>
          <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      
    <NavItem icon={LayoutGrid} path="/superadmin/organise-events" />
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white"  >
      <p>Menu</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
        </li>
        <li className=''>
          <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      
    <NavItem icon={Zap} path="/admin" />
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white"  >
    <p>Home</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
        </li>
      </ul>
      <div className='' >
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <NavItem icon={LogOut} path="/admin" />
    </TooltipTrigger>
    <TooltipContent className="bg-gray-800 text-white"  >
    <p>Logout</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
      </div>
    </div>
  );
};

export default AdminSidebar;
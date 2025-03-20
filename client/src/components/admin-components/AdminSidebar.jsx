import React from 'react';
import { Home, LayoutGrid, LogOut, Menu, Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavItem = ({ icon: Icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-3 rounded-full ${
      isActive ? "text-gray-200 bg-gray-800" : 
      "text-gray-700 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 hover:text-gray-200 hover:bg-gray-900 transition-colors duration-500"
    }`}
  >
    <Icon className="h-4 w-4" />
  </button>
);

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-between'>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
              <NavItem icon={Menu} 
              onClick={() => {}
                //  setActiveTab("menu")
                
              }
               isActive={activeTab === "menu"} />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white">
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ul className='flex flex-col items-center space-y-4'>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>

                <NavItem icon={Home} onClick={() => setActiveTab("home")} isActive={activeTab === "home"} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>

                <NavItem icon={LayoutGrid} onClick={() => setActiveTab("organise")} isActive={activeTab === "organise"} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p>Organise Events</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>

                <NavItem icon={Zap} 
                onClick={() => {}
                  // setActiveTab("analytics")

                }
                 isActive={activeTab === "analytics"} />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white">
                <p>Analytics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>

      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>

              <NavItem icon={LogOut} 
              onClick={() => {}
                // setActiveTab("logout")
              }
               isActive={activeTab === "logout"} />
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default AdminSidebar;

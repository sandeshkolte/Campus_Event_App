import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "lucide-react";
import { toggleSidebar } from "@/store/navSlice";
const Header = () => {
  const token = localStorage.getItem("userToken");
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.nav.sidebar);
  // let userId = null;
  // let userInfo?.role = null;

  // if (token && token.includes(".")) {
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     userId = decodedToken.id;  
  //     userInfo?.role = decodedToken.userInfo?.role;
  //     console.log(userInfo?.role);
        
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //   }
  // }

  // useFetchUserDetails(userId);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-15 backdrop-blur-lg bg-white bg-opacity-30 pr-5 py-2">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center bg-gradient-to-r ml-3 md:ml-6 from-purple-400 to-indigo-600 font-bold text-xl text-transparent bg-clip-text">
       <span> <img src="/college-logo.jpeg" alt="logo" className="h-8 w-8" /> </span>   Eventify
        </h1>

        <ul className="lg:flex justify-center items-center flex-row gap-5 font-semibold hidden">
          {/* Show links only when user is logged in */}
          {token && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
                  }
                >
                  Photo Gallery
                </NavLink>
              </li>

              {(userInfo?.role === "superadmin" || userInfo?.role === "admin") && (
                <li>
                  <NavLink
                    to="/verifytickets"
                    className={({ isActive }) =>
                      ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
                    }
                  >
                    Verify Tickets
                  </NavLink>
                </li>
              ) || ( <li>
                <NavLink
                  to="/mytickets"
                  className={({ isActive }) =>
                    ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
                  }
                >
                  My Tickets
                </NavLink>
              </li>) }

              {/* userInfo?.role-based links */}
              {(userInfo?.role === "superadmin" || userInfo?.role === "admin") && (
                <li>
                  <NavLink
                    to="/create"
                    className={({ isActive }) =>
                      `bg-gray-50 backdrop-blur-md bg-opacity-40 py-1 px-2 text-sm font-medium border border-gray-400 rounded-md 
                       ${isActive ? "text-black" : "md:text-gray-600 md:hover:text-black"}`
                    }
                  >
                    Create Event
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${isActive ? "text-black underline" : "text-black"}`
                  }
                >
                  <div className="outline-black outline-4">
                    <img
                      className="h-10 rounded-3xl object-cover"
                      src={userInfo?.image || "ProfileImage.jpeg"}
                      alt="profile"
                    />
                  </div>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger menu for mobile */}
        {token ? (
          <Menu
            onClick={() => dispatch(toggleSidebar())}
            className={`${
              sidebar === true ? "hidden" : "block lg:hidden"
            } text-3xl absolute top-2 right-2`}
          />
        ) : (
          // Show login button on small screens when no user is logged in
          <div className="flex items-center py-1 gap-4 mr-5 text-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
              }
            >
              Home
            </NavLink>
            {/* {location.pathname !== "/login" && ( */}
              <NavLink to="/login"
               className={({ isActive }) =>` ${isActive ? "hidden" : "bg-gray-950 py-1 px-2 text-white md:hover:text-white rounded-md text-sm"} `}
              >
                Log In
              </NavLink>
            {/* )} */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

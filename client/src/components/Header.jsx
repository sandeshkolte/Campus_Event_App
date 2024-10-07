import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "lucide-react";
import { toggleSidebar } from "@/store/navSlice";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const token = localStorage.getItem("userToken");
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.nav.sidebar);
  const navigate = useNavigate(); // For redirecting to login page
  const location=useLocation()
  let userId = null;

  if (token && token.includes(".")) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;  
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // useFetchUserDetails(userId);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-10 backdrop-blur-lg bg-white bg-opacity-30 pr-3">
      <div className="flex justify-between items-center">
        <h1 className="bg-gradient-to-r md:ml-6 from-purple-400 to-indigo-600 font-bold text-xl text-transparent bg-clip-text">
          Eventify
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

              {/* userInfo?.role-based links */}
              {(userInfo?.role === "superadmin" || userInfo?.role === "admin") && (
                <li>
                  <NavLink
                    to="/create"
                    className={({ isActive }) =>
                      ` ${isActive ? "md:text-black" : "md:text-gray-600"} bg-gray-50 backdrop-blur-md bg-opacity-40 py-1 px-2 text-black md:text-gray-500 md:hover:text-black font-medium border border-gray-400 rounded-md text-sm`
                    }
                  >
                    Create Event
                  </NavLink>
                </li>
              )}

              {(userInfo?.role === "superadmin" || userInfo?.role === "admin") && (
                <li>
                  <NavLink
                    to="/organised"
                    className={({ isActive }) =>
                      ` text-black md:hover:text-black font-medium ${isActive ? "text-black font-medium " : "md:text-gray-600"} text-sm`
                    }
                  >
                    Events Organised
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
            {location.pathname !== "/login" && (
              <Link to={"/login"}
                className="bg-gray-50 py-1 px-2 text-black md:text-gray-500 md:hover:text-black font-medium border border-gray-400 rounded-md text-sm"
              >
                Log In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

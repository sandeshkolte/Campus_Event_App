import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "lucide-react";
import { toggleSidebar } from "@/store/navSlice";
import { jwtDecode } from "jwt-decode";
import useFetchUserDetails from "@/hooks/useFetchUserDetails";

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
      userId = decodedToken._id; // Assuming you have userId in the token
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useFetchUserDetails(userId);

  // Redirect to login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white p-5 md:shadow-lg md:shadow-purple-200">
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
                    `${isActive ? "text-black underline" : "text-black"}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/mytickets"
                  className={({ isActive }) =>
                    `${isActive ? "text-black underline" : "text-black"}`
                  }
                >
                  My Tickets
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? "text-black underline" : "text-black"}`
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
                      `${isActive ? "text-black underline" : "text-black"}`
                    }
                  >
                    <div className="bg-gray-950 text rounded-md py-1 text-white px-2">
                      <h3 className="text-sm">Create Event</h3>
                    </div>
                  </NavLink>
                </li>
              )}

              {(userInfo?.role === "superadmin" || userInfo?.role === "admin") && (
                <li>
                  <NavLink
                    to="/organised"
                    className={({ isActive }) =>
                      `${isActive ? "text-black underline" : "text-black"}`
                    }
                  >
                    Events Organised
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
            } text-3xl absolute top-5 right-5`}
          />
        ) : (
          // Show login button on small screens when no user is logged in
          <div className="flex items-center gap-4 lg:mr-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "text-black underline" : "text-black"}`
              }
            >
              Home
            </NavLink>
            {location.pathname !== "/login" && (
              <button
                onClick={handleLoginRedirect}
                className="bg-gray-950 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Log In
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

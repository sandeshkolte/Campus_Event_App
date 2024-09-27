import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/store/authSlice';
import { toggleSidebar } from '@/store/navSlice';



const ProfileSidebar = () => {
    const dispatch=useDispatch()
    const sidebar = useSelector((state) => state.nav.sidebar);
    const navigate = useNavigate();


    const handleLogout = () => {
      dispatch(logout()); // Dispatch the logout action
      navigate("/");      // Navigate to home page after logging out
    };

    const handleLinkClick = (path) => {
      dispatch(toggleSidebar()); // Toggle the sidebar
      navigate(path);           // Navigate to the new path
    };
  return (
    // <aside className={`lg:w-80 bg-white z-30 lg:static fixed p-10 w-1/2 min-h-screen md:w-1/3 ${sidebar==true?"translate-x-0":"-translate-x-[500px]"}`}>
    <aside
    className={`lg:w-80 bg-white rounded-lg z-30 shadow-md lg:static fixed p-5 md:p-10 w-1/2 max-h-screen md:w-1/3 
    transition-transform duration-300 ease-in-out 
    ${sidebar ? "translate-x-0" : "-translate-x-[500px]"} 
    lg:translate-x-0`}
  >
      {/* <nav className="space-y-2">
        <Link
          to="/"
          className="block py-2 px-4 text-blue-600 bg-blue-50 rounded"
        >
          User Profile
        </Link>
        <Link
          to="/mytickets"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
        >
          My Tickets
        </Link>
        <Link
          to="/"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
        >
         History 
        </Link>
        <Link
          to="/"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
        >
         Certificate
        </Link>
        <Link
          to="/"
          className="block py-2 px-4 text-gray-700 lg:hidden hover:bg-gray-100 rounded"
        >
          Home
        </Link>
      </nav> */}
      <nav className="space-y-2 ">
    <button
        onClick={() => handleLinkClick('/profile')}
        className="flex items-center  pl-4 justify-start w-full text-blue-600 bg-blue-50 rounded py-2"
    >
        User Profile
    </button>
    <button
        onClick={() => handleLinkClick('/mytickets')}
        className="flex items-center pl-4 justify-start w-full text-gray-700 hover:bg-gray-100 rounded py-2"
    >
        My Tickets
    </button>
    <button
        onClick={() => handleLinkClick('/')}
        className="flex items-center pl-4 justify-start w-full text-gray-700 hover:bg-gray-100 rounded py-2"
    >
        History
    </button>
    <button
        onClick={() => handleLinkClick('/')}
        className="flex items-center pl-4 justify-start w-full text-gray-700 hover:bg-gray-100 rounded py-2"
    >
        Certificate
    </button>
    <button
        onClick={() => handleLinkClick('/')}
        className="flex items-center pl-4 justify-start w-full text-gray-700 lg:hidden hover:bg-gray-100 rounded py-2"
    >
        Home
    </button>
</nav>

      <button
      onClick={handleLogout}
       className="mt-8 flex items-center text-red-500 hover:text-red-600">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Sign out
      </button>
    </aside>
  );
};

export default ProfileSidebar;

import React from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSidebar';
import Footer from './components/Footer';
import NotificationComponent from './components/utils/NotificationComponent';

const Layout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div>
      <Header />
      {!isProfilePage && (
        <div className="flex justify-end items-center z-50 lg:hidden"> {/* Hide on large screens */}
          <div className="flex items-center space-x-4 pr-10 pt-1">
            <NotificationComponent />
            <ProfileSidebar />
          </div>
        </div>
      )}
      <div className="md:pt-10">
        <Outlet />
      </div>
      {/* <Footer/> */}
      {/* <NavBar/> */}
    </div>
  );
};

export default Layout;
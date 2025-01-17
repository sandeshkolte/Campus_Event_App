import React from 'react';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSidebar';
import Footer from './components/Footer';
import NotificationComponent from './components/utils/NotificationComponent';
import SuperAdminPanel from './pages/SuperAdminPanel';

const Layout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isAdminPage = location.pathname === '/superadmin';

  return (
    // <SuperAdminPanel/>
    <div>
      {!isAdminPage && <Header />}
      {!isProfilePage && (
        <div className="flex justify-end items-center z-50 lg:hidden"> {/* Hide on large screens */}
          <div className="flex items-center space-x-4 pr-10 pt-1">
            <ProfileSidebar />
          </div>
        </div>
      )}
      <div className={` ${!isAdminPage ? 'md:pt-10' : ''}  `}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
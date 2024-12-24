import React from 'react'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import ProfileSidebar from './components/ProfileSidebar'
import Footer from './components/Footer'
import NotificationComponent from './components/utils/NotificationComponent'
// import NavBar from './components/NavBar'

const Layout = () => {
  const location = useLocation();
  // Check if the current route is the profile page
  const isProfilePage = location.pathname === '/profile';

  return (
    <div >
        <Header/>
        {!isProfilePage && (
        <div className="block lg:hidden"> {/* Hide on large screens */}
          <NotificationComponent/>
          <ProfileSidebar />
        </div>
      )}
        <div className='pt-10'>
        <Outlet/>
        </div>
        {/* <Footer/> */}
        {/* <NavBar/> */}
    </div>
  )
}

export default Layout
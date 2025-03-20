import { baseUrl } from '@/common/common';
import AdminSidebar from '@/components/admin-components/AdminSidebar';
import AdminToggle from '@/components/admin-components/AdminToggle';
import HomeComponent from '@/components/admin-components/HomeComponent';
import NotificationComponent from '@/components/utils/NotificationComponent';
import { fetchEvents, fetchUsers } from '@/store/adminSlice';
import axios from 'axios';
import { Slack } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SuperAdminPanel = () => {
  const dispatch = useDispatch();
  const { users, events, totalParticipants, totalRevenue } = useSelector((state) => state.admin);
  const userInfo = useSelector((state) => state.auth?.userInfo);

  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (userInfo?.role === 'superadmin') {
      // Dispatch actions to fetch users and events
      dispatch(fetchUsers({ branch: userInfo?.branch, role: userInfo?.role }));

      dispatch(fetchEvents(userInfo?.branch));
    }
  }, [dispatch, userInfo]);

  return (
    <div className='max-h-screen overflow-hidden w-full relative backdrop-blur-md bg-gradient-to-tr from-[#d7d8e0] via-[#d7d8e0] to-[#e8e8e8]'>
      <div className='absolute -bottom-32 -left-5 h-72 w-72 rounded-full bg-[#bbb3f5] blur-2xl animate-shapeChange'></div>
      <nav className='flex py-5 w-full'>
        <div className='flex justify-center w-36'>
          <Slack />
        </div>
        <div className='flex justify-between w-full px-5 text-lg'>
          <h3>Eventify</h3>
          <div className='px-2 flex items-center'>
            <div className='px-2'>
              <NotificationComponent />
            </div>
            <div className="outline-black outline-4 pl-2">
              <img
                className="h-10 rounded-3xl object-cover"
                src={userInfo?.image || "ProfileImage.jpeg"}
                alt="profile"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className='flex'>
        <aside className='w-36 max-h-screen z-10 py-10'>
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>
        <div className='w-full'>
          <section className='heading flex justify-between lg:py-10  px-5 w-full'>
            <div className='w-[50%]'>
              <h3 className='lg:text-3xl text-xl font-semibold'>Good Morning, {userInfo?.firstname}!</h3>
              <p className='text-sm text-gray-700 pt-3'>Let's handle the events productively.</p>
            </div>
            <div className='flex w-[50%] justify-between'>
              <div>
                <p className='text-sm text-gray-700'>Total Revenue</p>
                <h3 className='lg:text-4xl text-xl font-semibold pt-2 flex justify-center'>₹{totalRevenue}</h3>
              </div>
              <div>
                <p className='text-sm text-gray-700'>Total Students</p>
                <h3 className='lg:text-4xl text-xl font-semibold pt-2 flex justify-center'>{totalParticipants}</h3>
              </div>
              <div className='hidden  bg-pink-700 rounded-3xl text-white text-center h-12 w-32 my-auto lg:flex align-middle justify-center'>
                <h3 className=' font-light py-3'>{userInfo?.branch}</h3>
              </div>
            </div>
          </section>

          {/* Render content dynamically based on activeTab */}
          <div className="">
            {activeTab === "home" && <HomeComponent />}
            {activeTab === "organise" && <AdminToggle />}
            {activeTab === "analytics" && <div>Analytics Component</div>}
            {activeTab === "menu" && <div>Menu Component</div>}
            {activeTab === "logout" && <div>Logging out...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;

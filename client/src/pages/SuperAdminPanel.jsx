import { baseUrl } from '@/common/common';
import AdminSidebar from '@/components/admin-components/AdminSidebar';
import HomeComponent from '@/components/admin-components/HomeComponent';
import NotificationComponent from '@/components/utils/NotificationComponent';
import { fetchEvents, fetchUsers } from '@/store/adminSlice';
import axios from 'axios';
import { PiIcon, Slack, Users, Users2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const SuperAdminPanel = () => {

        const dispatch = useDispatch();
  const { users, events, totalParticipants, totalRevenue, loading, error } = useSelector((state) => state.admin);
  const userInfo = useSelector((state) => state.auth?.userInfo);


  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEvents());
  }, [dispatch]);

        return (
                <>
                        <div className='max-h-screen overflow-hidden w-full relative backdrop-blur-md bg-gradient-to-tr from-[#d7d8e0] via-[#d7d8e0] to-[#e8e8e8]' >
                                <div className='absolute -bottom-32 -left-5 h-72 w-72 rounded-full bg-[#bbb3f5] blur-2xl animate-shapeChange' ></div>
                                <nav className=' flex py-5 w-full' >
                                        <div className='flex justify-center w-36' >
                                        <Slack />
                                        </div>
                                <div className='flex justify-between w-full px-5 text-lg ' >
                                        <h3>Eventify</h3>
                                        <div className='px-2 flex items-center'  >
                                                <div className='px-2' >
                                                <NotificationComponent/>
                                                </div>
                                                                <NavLink
                                                                  to="/profile"
                                                                  className={({ isActive }) =>
                                                                    `${isActive ? "text-black underline" : "text-black"}`
                                                                  }
                                                                >
                                                                  <div className="outline-black outline-4 pl-2">
                                                                    <img
                                                                      className="h-10 rounded-3xl object-cover"
                                                                      src={userInfo?.image || "ProfileImage.jpeg"}
                                                                      alt="profile"
                                                                    />
                                                                  </div>
                                                                </NavLink>
                                        </div>
                                </div>
                                </nav>
                                <div className='flex' >
                                        <aside className='w-36 max-h-screen z-10 py-10' >
                                                <AdminSidebar />
                                        </aside>
                                        <div className='w-full' >
                                                <section className='heading flex justify-between py-10 px-5 w-full ' >
                                                        <div className='w-[50%] ' >
                                                                <h3 className='text-3xl font-semibold' >Good Morning, {userInfo?.firstname}!</h3>
                                                                <p className='text-sm text-gray-700 pt-3' >Let's handle the events productively.</p>
                                                        </div>
                                                        <div className='flex w-[50%] justify-between' >
                                                                <div className='' >
                                                                        <p className='text-sm text-gray-700' >Total Revenue</p>
                                                                        <h3 className='text-4xl font-semibold pt-2 flex justify-center' >₹{totalRevenue}</h3>
                                                                </div>
                                                                <div>
                                                                        <p className='text-sm text-gray-700' >Total Students</p>
                                                                        <h3 className='text-4xl font-semibold pt-2 flex justify-center' >{totalParticipants}</h3>
                                                                </div>
                                                                <div className='bg-gray-800 rounded-3xl text-white text-center h-12 w-32 my-auto flex align-middle justify-center' >
                                                                        <h3 className='text-sm font-light py-3' >+ Add Task</h3>
                                                                </div>
                                                        </div>
                                                </section>
                                                <Outlet/>
                                                
                                        </div>
                                </div>
                        </div>
                </>
        )
}

export default SuperAdminPanel
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchEvents } from '@/store/adminSlice'; // Import actions
import { Users } from 'lucide-react';

const HomeComponent = () => {
  const dispatch = useDispatch();

  // Access state from Redux store
  const { users, events, loading, totalParticipants, totalRevenue } = useSelector((state) => state.admin);
  const userInfo = useSelector((state) => state.auth?.userInfo);

  useEffect(() => {
    if (userInfo?.role === 'superadmin') {
      // Dispatch actions to fetch users and events
      dispatch(fetchUsers({ branch: userInfo?.branch, role: userInfo?.role }));

      dispatch(fetchEvents(userInfo?.branch));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <section className="content w-full px-5 overflow-y-auto h-[calc(100vh-200px)]">
        <div className="row1 my-5 py-5 row-span-1 md:grid grid-flow-col grid-cols-3">
          {/* Students Container */}
          <div className="sq-container md:col-span-1 px-2 py-3 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-3xl w-80 h-80">
            <header className="flex px-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-black">Students</h3>
                <p className="text-xs text-gray-700">
                  {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
            </header>
            <div className="bg-gray-100 rounded-xl h-60 px-2 my-2 overflow-scroll">
              {loading ? (
                <p>Loading students...</p>
              ) : (
                <ul>
                  {users?.map((user) => (
                    <li key={user._id} className="py-2">
                      <div className="flex justify-around">
                        <img src={user?.image} alt="user" className="h-10 rounded-full" />
                        <div className="w-48">
                          <h3 className="flex text-sm text-gray-900 font-medium overflow-ellipsis overflow-hidden whitespace-nowrap">
                            {user.firstname} {user.lastname}
                          </h3>
                          <p className="text-xs text-gray-700">{user.yearOfStudy} year</p>
                        </div>
                      </div>
                      <hr />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Events Container */}
          <div className="rect-container md:col-span-2 px-2 py-3 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-3xl w-full h-80">
            <header className="flex px-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-black">All Events</h3>
                <p className="text-xs text-gray-700">What is waiting for you today</p>
              </div>
            </header>
            <div className="bg-gray-100 rounded-xl h-60 px-2 my-2 overflow-scroll">
              {loading ? (
                <p>Loading events...</p>
              ) : (
                events?.map((event) => {
                  const earnings = event.price * event.participants.length;
                  return (
                    <li key={event._id} className="py-2 list-none">
                      <div className="flex justify-around">
                        <img src={event?.image} alt="event" className="hidden lg:block h-20 rounded-sm w-32" />
                        <div className="w-80">
                          <div className="flex lg:justify-between justify-evenly">
                            <h3 className="flex text-sm text-gray-900 font-medium overflow-ellipsis overflow-hidden whitespace-nowrap">
                              {event.title}
                            </h3>
                            <p className="text-green-600 text-sm lg:text-base font-medium rounded-md bg-gray-100 border-2 backdrop-blur-md p-1">
                              ₹{earnings}
                            </p>
                          </div>
                          <p className="text-xs text-gray-700">{event.isGroupEvent ? 'Group' : 'Individual'}</p>
                          <p className="flex">
                            <Users className="w-4" />
                            {event?.participants.length}
                          </p>
                        </div>
                        <p className="text-xs text-gray-700">
                          {new Date(event.startDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <hr />
                    </li>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeComponent;
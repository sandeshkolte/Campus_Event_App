import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import {jwtDecode} from 'jwt-decode'
import Home from './pages/Home'
import Layout from './Layout'
import Profile from './pages/Profile'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CreateEvent from './pages/CreateEvent'
import ProtectedRoute from './components/ProtectedRoute'
import { baseUrl } from './common/common'
import { login } from './store/authSlice'
import { activeEvents, allEvents, myOrganizedEvents } from './store/eventSlice'
import MyTickets from './pages/MyEvents'
import EventDetailsPage from './pages/EventDetailsPage'
import BookingPage from './pages/BookingPage'
import VerifyEmail from './pages/VerifyEmail'
import PhotoGallery from './pages/PhotoGallery'
import EventsOrganized from './pages/EventsOrganized'
import CSECommittee from './pages/CommitteePage'
import VerifyTickets from './pages/VerifyTickets'
import TicketStatusChangingPage from './pages/TicketStatusChangingPage'
import { VscLoading } from 'react-icons/vsc'
import OrganizersComponent from './components/OrganizersComponent'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import PageNotFound from './components/utils/PageNotFound'
import NotificationComponent from './components/utils/NotificationComponent'
import UpdateEvent from './pages/UpdateEventCard'
import WinnersPage from './pages/WinnersPage'
import CivilCommittee from './components/CivilCommittePage'
import EntcCommittee from './components/EntcCommittee'
import MECommittee from './components/MechCommittee'
import ElectricalCommittee from './components/ElecCommittee'
import InstrumentationCommittee from './components/InstruCommittee'
import { AnimatePresence } from 'framer-motion'
import SuperAdminPanel from './pages/SuperAdminPanel'
import ManageEvents from './components/admin-components/ManageEvents'
import HomeComponent from './components/admin-components/HomeComponent'

// Loading Screen Component
const LoadingScreen = () => (
  <div className="loading-screen flex justify-center items-center h-screen">
    <div>
    <div className='flex justify-center items-center text-sm' >
      <img src="college-logo.jpeg" alt="logo" className='h-10 w-10 md:h-20 md:w-20' />
      <p className='pl-2 font-bold text-indigo-800' >GCOEC<br />Chandrapur</p>
      <hr className="border-gray-300 rounded-md border-[1.5px] w-10 md:w-14 rotate-90" />
    <h1 className="bg-gradient-to-r from-purple-400 to-indigo-600 font-bold md:text-xl text-transparent bg-clip-text">
          Eventify
        </h1>
    </div>
    <h3 className='flex justify-center text-gray-700 font-bold pt-2' ><span className='pr-2' ><VscLoading className='text-purple-500 text-xl animate-spin-slow' /></span> Loading...</h3>
    </div>
  </div>
)

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const token = localStorage.getItem("userToken")
  const isAuthenticated = token !== null && token !== ""

  let userId = null
  let role = null

  if (token && token.includes('.')) {
    try {
      userId = jwtDecode(String(token)).id
      role = jwtDecode(String(token)).role
    } catch (error) {
      console.error("Invalid token:", error)
    }
  }

  const fetchUserDetails = async () => {
    try {
      if (userId) {
        const result = await axios.get(`${baseUrl}/api/user/getuser/${userId}`)
        if (result.status === 200) {
          const userDetails = result.data.response
          dispatch(login(userDetails))
        }
      }
    } catch (err) {
      console.error("Error fetching user details:", err)
    }
  }

  const fetchAllEvents = async () => {
    try {
      const result = await axios.get(`${baseUrl}/api/event/`)
      const events = result.data.response
      dispatch(allEvents(events))
    } catch (err) {
      toast.error(err.message || "Error fetching events")
      console.error("Error fetching all events:", err)
    }
  }

  const fetchActiveEvents = async (userID) => {
    try {
      const result = await axios.get(`${baseUrl}/api/event/active-events/${userID}`)
      const events = result.data.adminEvents
      dispatch(activeEvents(events))
    } catch (err) {
      toast.error(err.message || "Error fetching active events")
      console.error("Error fetching active events:", err)
    }
  }

  const fetchMyOrganizedEvents = async (userID) => {
    try {
      const result = await axios.get(`${baseUrl}/api/event/myallevents/${userID}`)
      const events = result.data.adminEvents
      dispatch(myOrganizedEvents(events))
    } catch (err) {
      toast.error(err.message || "Error fetching active events")
      console.error("Error fetching active events:", err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (token && userId) {
        await fetchUserDetails()
        // const knock = new Knock(); 
        // knock.authenticate(userId, token);
      }
      await fetchAllEvents()
      if (role === "admin") {
        await fetchActiveEvents(userId)
        await fetchMyOrganizedEvents(userId)
      }
      setLoading(false)
    }
    fetchData()
  }, [token, userId])

  // if (loading) {
  //   return <LoadingScreen /> // Show loading screen while data is loading
  // }

const location = useLocation();

  return (
    <div className='fade-in' >
      <AnimatePresence location={location} key={location.pathname}  >
 
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/eventdetails/:id' element={<EventDetailsPage />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/gallery' element={<PhotoGallery />} />
        <Route path='/winners' element={<WinnersPage />} />
        <Route path='/cse-committee' element={<CSECommittee />} />
        <Route path='/civil-committe' element={<CivilCommittee />} />
        <Route path='/elec-committee' element={<ElectricalCommittee />} />
        <Route path='/entc-committee' element={<EntcCommittee />} />
        <Route path='/instru-committee' element={<InstrumentationCommittee />} />
        <Route path='/mech-committee' element={<MECommittee />} />

        {!isAuthenticated && (
          <>
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/login' element={<LoginForm />} />
          </>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path='/register' element={<Navigate to="/" />} />
          <Route path='/login' element={<Navigate to="/" />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mytickets' element={<MyTickets />} />
          <Route path='/buyticket/:id' element={<BookingPage />} />
          {(role === "admin" || role === "superadmin") && (
            <>
              <Route path='/create' element={<CreateEvent />} />
              <Route path='/organized' element={<EventsOrganized />} />
              <Route path='/update/:id' element={<UpdateEvent />} />
              <Route path="/verifytickets" element={<VerifyTickets />} />
              <Route path="/event/:id" element={<TicketStatusChangingPage />} />


              <Route path="superadmin" element={<SuperAdminPanel />}>
                      <Route index element={<HomeComponent />} />
                      <Route path="organise-events" element={<ManageEvents />} />
                    </Route>
            </>
          )}
        </Route>
      </Route>
    <Route path="*" element={<PageNotFound />} />
    </Routes>
    </AnimatePresence>
    </div>
  )
}

export default App

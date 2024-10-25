import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Profile from './pages/Profile'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CreateEvent from './pages/CreateEvent'
import ProtectedRoute from './components/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { baseUrl } from './common/common'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'
import { activeEvents, allEvents } from './store/eventSlice'
import { toast } from 'react-toastify'
import MyTickets from './pages/MyEvents'
import EventDetailsPage from './pages/EventDetailsPage'
import BookingPage from './pages/BookingPage'
import VerifyEmail from './pages/VerificationPage'
import PhotoGallery from './pages/PhotoGallery'
import EventsOrganized from './pages/EventsOrganized'
import CSECommittee from './pages/CommitteePage'
import VerifyTickets from './pages/VerifyTickets'
import TicketStatusChangingPage from './pages/TicketStatusChangingPage'

const App = () => {

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

  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    try {
      if (userId) {
        axios.post(baseUrl + `/api/user/getuser/?userid=${userId}`).then((result) => {
          if (result.status === 200) {
            const userDetails = result.data.response
            dispatch(login(userDetails))
          }
        })
      }
      // const userInfo = localStorage.getItem('userInfo')
      // if (userInfo) {
      //   dispatch(login(JSON.parse(userInfo)))  // Rehydrate user info from localStorage
      // }

    } catch (err) {
      console.log(err)
    }
  }

  const fetchAllEvents = async () => {
    try {
      axios.get(baseUrl + "/api/event/").then(result => {
        const events = result.data.response
        dispatch(allEvents(events))
      }).catch(err => {
        toast.error(err)
      })
    } catch (err) {
      toast.error(err)
    }
  }

  useEffect(() => {
    if (token && userId) {
      // console.log("token called")
      fetchUserDetails()
    }
  }, [token, userId])

  useEffect(() => {
    fetchAllEvents()

  }, [])


  const fetchActiveEvents = async (userID) => {
    try {
      const result = await axios.get(
        baseUrl + `/api/event/active-events/${userID}`
      );
      const events = result.data.adminEvents;
      dispatch(activeEvents(events))
      console.log(events);
    } catch (err) {
      toast.error(err.message || "Error fetching events");
      console.error("Error fetching events:", err); // Log the error for debugging
    }
  };

  useEffect(() => {
    if (userId) {
      fetchActiveEvents(userId); // Pass userID as argument
    }
  }, [userId]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='' element={<Home />} />
          <Route path='/eventdetails/:id' element={<EventDetailsPage />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/gallery' element={<PhotoGallery />} />
          <Route path='/committeepage' element={<CSECommittee/>}/>

          {/* Unauthorized Routes */}
          {!isAuthenticated && (
            <>
              <Route path='/register' element={<SignUpPage />} />
              <Route path='/login' element={<SignInPage />} />
            </>
          )}

          {/* Protected Routes  */}
          <Route element={<ProtectedRoute />}>
            <Route path='/register' element={<Navigate to="/" />} />
            <Route path='/login' element={<Navigate to="/" />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/mytickets' element={<MyTickets />} />
            <Route path='/buyticket/:id' element={<BookingPage />} />
{(role==="admin"||"superadmin") && (
<>
<Route path='/create' element={<CreateEvent />} />
<Route path='/organized' element={<EventsOrganized />} />
<Route path="/verifytickets" element={<VerifyTickets/>}/>
<Route path="/event/:id" element={<TicketStatusChangingPage />} />
</>
) 
}
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
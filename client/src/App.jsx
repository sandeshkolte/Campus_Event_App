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
import { allEvents } from './store/eventSlice'
import EventDetail from './components/EventDetail'
import { toast } from 'react-toastify'
import MyTickets from './pages/MyEvents'
import EventsOrganised from './pages/EventsOrganised'
import EventDetailsPage from './pages/EventDetailsPage'
import BookingPage from './pages/BookingPage'

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
        console.log(result.data.response)
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

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='' element={<Home />} />
          <Route path='/eventdetails/:id' element={<EventDetailsPage />} />

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
<Route path='/organised' element={<EventsOrganised />} />
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
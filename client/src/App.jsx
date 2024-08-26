import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import MyEvents from './pages/MyEvents'
import Profile from './pages/Profile'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CreateEvent from './pages/CreateEvent'

const App = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<Layout/>} >
      <Route path='' element={<Home/>} />
      <Route path='/myevents' element={<MyEvents/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/register' element={<SignUpPage/>} />
      <Route path='/login' element={<SignInPage/>} />
      <Route path='/create' element={<CreateEvent/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
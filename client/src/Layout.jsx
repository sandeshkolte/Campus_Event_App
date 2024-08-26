import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

const Layout = () => {
  return (
    <div >
        <Header/>
        <Outlet/>
        {/* <NavBar/> */}
    </div>
  )
}

export default Layout
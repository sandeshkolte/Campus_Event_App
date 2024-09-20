import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
// import NavBar from './components/NavBar'

const Layout = () => {
  return (
    <div >
        <Header/>
        <div className='pt-20'>
        <Outlet/>
        </div>
        {/* <NavBar/> */}
    </div>
  )
}

export default Layout
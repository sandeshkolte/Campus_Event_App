import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { logout } from "@/store/authSlice"
  import React from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


  const AlertComponent = ({title="title"}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("logout called");
    dispatch(logout())
    navigate('/')
    window.location.reload();
    }

    return (
      <div>
        <AlertDialog>
      <AlertDialogTrigger
       className="absolute top-0 right-0 m-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 outline outline-1 outline-gray-300 bg-white cursor-default rounded-md px-3 py-2 font-semibold " 
       varient="outline" >{title}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
           The Evently team will be waiting for you, come back soon, have a nice day!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-gray-900 text-white" onClick={handleLogout} >Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
    )
  }
  
  export default AlertComponent
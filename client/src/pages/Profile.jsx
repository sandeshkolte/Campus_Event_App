import RegisterForm from '@/components/RegisterForm'
import UserProfileCard from '@/components/UserProfileCard'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector((state) => state.auth.userInfo)
  return (
    <div className='flex justify-center align-middle mt-5' >
   <UserProfileCard  user={user} />
    </div>
  )
}

export default Profile
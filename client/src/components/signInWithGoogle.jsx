import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";
import { auth } from '@/firebase';
import { baseUrl } from '@/common/common';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { useForm } from 'react-hook-form';

const SignInWithGoogle = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { reset } = useForm()

const googleLogin = () =>{
const provider = new GoogleAuthProvider();
signInWithPopup(auth,provider).then( async (result) =>{
console.log(result);
if(result.user){
    console.log(result.user.displayName);
    try {
      await axios.post(baseUrl + '/api/user/google', { 
        "email" : result.user.email,
        "firstname" : result.user.displayName.split(' ')[0],
        "lastname" : result.user.displayName.split(' ')[1],
        "image":result.user.photoURL
    }).then((response) => {
        // if(response.status === 201) {
        toast.success("User Login Successfully!")
        console.log(JSON.stringify(response.data.response))
        const { token } = response.data.response
        // const {fullname, email } = response.data.response.createdUser;
        localStorage.setItem('userToken', token)
        dispatch(login(response.data.response.user))
        reset();
        navigate('/')
        window.location.reload();
        // }
        // setProgressPercent(0);
      })
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Fetch aborted");
      } else {
        console.error("Registration failed:", err);
        toast.error("User Already Exist !")
      }
    }
}
})
}

  return (
    <div>
        <Button variant="outline" 
        className="flex gap-2 justify-center align-middle w-full"
        onClick={googleLogin}
        >
              <FcGoogle />Sign in with Google
            </Button>
    </div>
  )
}

export default SignInWithGoogle
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";
import { auth } from '@/firebase';

const SignInWithGoogle = () => {

const googleLogin = () =>{
const provider = new GoogleAuthProvider();
signInWithPopup(auth,provider).then( async (result) =>{
console.log(result);
if(result.user){
    toast.success("User Logged in Successfully!")
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
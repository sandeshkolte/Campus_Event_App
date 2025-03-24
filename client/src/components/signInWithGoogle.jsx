import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reset } = useForm();

  const googleLogin = async (e) => {
    e.stopPropagation();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user) return;

      const { email, displayName, photoURL } = result.user;
      const firstname = displayName.split(' ')[0];
      const lastname = displayName.split(' ')[1] || '';

      const response = await axios.post(`${baseUrl}/api/user/google`, {
        email,
        firstname,
        lastname,
        image: photoURL,
      });

      const { token, user } = response.data.response;
      localStorage.setItem('userToken', token);
      dispatch(login(user));

      reset();
      toast.success("User Login Successfully!");
      navigate('/');
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error("User Already Exists!");
      } else {
        console.error("Login failed:", err);
        toast.error("Something went wrong. Try again!");
      }
    }
  };

  return (
    <Button variant="outline" className="flex gap-2 justify-center w-full" onClick={googleLogin}>
      <FcGoogle /> Sign in with Google
    </Button>
  );
};

export default SignInWithGoogle;

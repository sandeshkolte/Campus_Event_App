import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { baseUrl } from "@/common/common"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { VscLoading } from "react-icons/vsc";
import SignInWithGoogle from "./signInWithGoogle"

export default function RegisterForm() {

  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm()

  const [loading, setLoading] = React.useState(false)

  const formSubmit = async (data) => {
    // console.log(data);
    setLoading(true)
    try {
      await axios.post(baseUrl + '/api/user/register', data).then((response) => {
        // console.log(JSON.stringify(data))

        toast.success("User Registered Successfully! Please verify your email.");
        reset();
        navigate('/login');

      })
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.response;
        
        // Show the error message based on server response
        toast.error(errorMessage);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
     <div className='flex justify-center align-middle mt-5' >
     <Card className="w-[400px]">
      <form onSubmit={handleSubmit(formSubmit)} >
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Enter your details to create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pb-2">
            {/* <SignInWithGoogle/> */}
          </div>
          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
            <p className="mx-2 text-xs text-gray-400 uppercase">or continue with</p>
            <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstname">First Name</Label>
              <Input required id="firstname" placeholder="Type your First name" {...register('firstname')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Last Name</Label>
              <Input required id="lastname" placeholder="Type your Last name" {...register('lastname')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input required id="email" type="email" placeholder="Type your email" {...register('email')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" type="password" placeholder="Type your password" {...register('password')} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid" >
          <Button className="w-full bg-gray-900 text-white" >{loading ? <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : "SIGN UP"}</Button>
          <hr className="mt-3 border-gray-300 rounded-md border-[1.5px]" />
          <div className="flex py-2 justify-center" >
            <p className="" >Already Have an Account?</p>
            <Link to={"/login"} className="pl-2 underline" >Sign In</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
     </div>
    </>
  
  )
}

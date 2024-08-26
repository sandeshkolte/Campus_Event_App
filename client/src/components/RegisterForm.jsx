import * as React from "react"
import { Link } from "react-router-dom"
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
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function RegisterForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around align-middle pb-2">
        <Button variant="outline" className="flex justify-around align-middle w-28">
        <FaGithub />Github
        </Button>
        <Button variant="outline" className="flex justify-around align-middle w-28">
        <FaGoogle />Google
        </Button>
        </div>
        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
          <p className="mx-2 text-xs text-gray-400 uppercase">or continue with</p>
          <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
        </div>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Type your full name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Type your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Type your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="grid" >
        <Button className="w-full" >SIGN UP</Button>
        <hr className="mt-3 border-gray-300 rounded-md border-[1.5px]" />
<div className="flex py-2 justify-center" >
<p className="" >Already Have an Account?</p>
<Link to={"/login"} className="pl-2 underline" >Sign In</Link>
</div>

      </CardFooter>
    </Card>
  )
}
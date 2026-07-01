import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase";
import { getRedirectResult } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "@/common/common";
import { toast } from "react-toastify";
import { login } from "@/store/authSlice";
import { VscLoading } from "react-icons/vsc";
import SignInWithGoogle from "./signInWithGoogle";
import { InfoIcon } from "lucide-react";
import { PopoverComponent } from "./PopOverComponent";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
  const handleGoogleRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);

      if (!result?.user) return;

      const { email, displayName, photoURL } = result.user;

      const firstname = displayName?.split(" ")[0] || "";
      const lastname = displayName?.split(" ").slice(1).join(" ") || "";

      const response = await axios.post(`${baseUrl}/api/user/google`, {
        email,
        firstname,
        lastname,
        image: photoURL,
      });

      const { token, user } = response.data.response;

      localStorage.setItem("userToken", token);
      dispatch(login(user));

      toast.success("User Login Successfully!");

      navigate("/");
    } catch (err) {
      if (!err) return;

      console.error("Google Redirect Login:", err);

      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error("User Already Exists!");
      } else {
        toast.error("Google Login Failed.");
      }
    }
  };

  handleGoogleRedirect();
}, [dispatch, navigate]);

  const formSubmit = async (data) => {
    if (data.email !== "" && data.password !== "") {
      setLoading(true);
      try {
        const response = await axios.post(baseUrl + '/api/user/login', data);
        
        if (response.status === 200) {
          toast.success("User Login Successfully!");
          const { token, user } = response.data.response;
         localStorage.setItem("userToken", token);
dispatch(login(user));
reset();
navigate("/");
        } else if (response.status === 400) {
          toast.error("Email not verified.");
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.response;
          
          if (errorMessage === "Email not verified") {
            toast.error("Your email is not verified. Please verify your email before logging in.");
            setError("email", { message: "Your email is not verified." });
          } else if (errorMessage === "Email or Password Incorrect") {
            toast.error("Incorrect email or password.");
            setError("email", { message: "Incorrect email or password." });
            setError("password", { message: "Incorrect email or password." });
          } else {
            toast.error("An error occurred during login.");
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill out the form.");
    }
  };

  return (
    <>
    <div className="flex justify-center align-middle mt-5" >
    <Card className="w-[400px]">
        <CardHeader className="relative">
          <div className="absolute right-7 top-8 " >
            <PopoverComponent trigger={ <InfoIcon className="text-rose-400 h-5" />} content={
              <div >
                <p className="text-sm " >If you Sign in with Google then you cannot use manual login with that email</p>
              </div>
            } />
           
            </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your details to sign in to your account.</CardDescription>
        </CardHeader>
      <form onSubmit={handleSubmit(formSubmit)}>
        <CardContent>
          <SignInWithGoogle />
          
          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
            <p className="mx-2 text-xs text-gray-400 uppercase">or continue with</p>
            <hr className="flex-grow border-gray-300 rounded-md border-[1.5px]" />
          </div>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                required 
                id="email" 
                type="email" 
                placeholder="Type your email" 
                {...register('email')} 
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                required 
                id="password" 
                type="password" 
                placeholder="Type your password" 
                {...register('password')} 
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid">
          <Button type="submit" className="w-full bg-gray-900 text-white">
            {loading ? <VscLoading className="text-white animate-spin-slow text-2xl" /> : "SIGN IN"}
          </Button>
          <hr className="mt-3 border-gray-300 rounded-md border-[1.5px]" />
          <div className="flex py-2 justify-center">
            <p>Don't Have an Account?</p>
            <Link to="/register" className="pl-2 underline">Sign Up</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
    </div>
    </>
  
  );
}

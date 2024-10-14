import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "@/common/common";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      axios.get( baseUrl+ `/verify-email?token=${token}`).then((response) => {
        toast.success("Email verified! Please log in.");
        navigate("/login");
      }).catch((error) => {
        // toast.error("Email verification failed.");
        console.error(error);
      });
    }
  }, [location, navigate]);

  return <div className="h-96 flex justify-center items-center" >
    <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" 
    alt="loading" height={100} width={100}
     className="mix-blend-multiply opacity-90" />
    <h3 className="text-center text-xl" >Verifying email...</h3>
    </div>;
}

export default VerifyEmail;

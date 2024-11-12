import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, GraduationCap, BookOpen, Phone, CircleX, IndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux';
import { storage } from '@/firebase';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import { baseUrl } from '@/common/common';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VscLoading } from 'react-icons/vsc';
import SelectorPrac from './SelectorPrac';

export default function TicketBooking({ isOpen, onClose,eventDetails }) {
  const currentUser = useSelector((state)=>state.auth?.userInfo) // Replace with actual username from your state or props
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchMember, setSearchMember] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isBookingLoading, setisBookingLoading] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = React.useState("")
  const [file, setFile] = React.useState(null)
  const navigate = useNavigate()
  const { register, handleSubmit, reset, setValue } = useForm()

// console.log(currentUser);

  const handleAddMember = () => {
    if (searchMember && !groupMembers.includes(searchMember)) {
      setGroupMembers([...groupMembers, searchMember]);
      setSearchMember('');
    }
  };

  if (!isOpen) return null;

  const handleImageUpload = (file) => {
    setisLoading(true)
    return new Promise((resolve, reject) => {
      if (!file) {
        setisLoading(false)
        reject("No file provided");
      }

      const storageRef = ref(storage, `payment-screenshots/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          toast.error("Image upload failed!");
          reject(error);
          setisLoading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            setisLoading(false)
            setPaymentScreenshot(downloadURL)
            console.log("payment ss Url: ",downloadURL);
            
          });
        }
      );
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
        };
        reader.readAsDataURL(file);
      
    }
  };

  const handleBookEvent = async (data) => {
    setisBookingLoading(true);
  
    try {
      if (eventDetails?.isGroupEvent && data.groupName === "") {
        toast.error("Group Name is Required!");
        setisBookingLoading(false);
        return;
      }
  
      if (paymentScreenshot === "") {
        toast.error("Upload Payment Screenshot!");
        setisBookingLoading(false);
        return;
      }
  
      data = { ...data, userId: currentUser?._id, eventId: eventDetails._id, paymentImage: paymentScreenshot };

      console.log(`The data to upload: ${data.userId} ${data.eventId} ${data.paymentImage}`);
  
      if (!eventDetails?.isGroupEvent) {
        // Solo event booking
        await axios.post(baseUrl + '/api/event/add-participants', data).then((response) => {
          if (response.status === 200) {
            console.log("result: ", response);
            toast.success("Event Booked Successfully");
            navigate('/mytickets');
          }
        });
      } else {
        // Group event booking
        if (data.participants.length === eventDetails?.participantSize) {
          await axios.post(baseUrl + '/api/event/add-group-participants', data).then((response) => {
            if (response.status === 200) {
              console.log("result: ", response);
              toast.success("Event Booked Successfully");
              navigate('/mytickets');
            }
          });
        } else {
          // Participant size does not match event participant size
          const size = eventDetails?.participantSize;
          toast.error(`Participant size must be ${size}`);
        }
      }
    } catch (error) {
      console.log("error: ",error);
      toast.error(`Error: ${error}`);
    } finally {
      setisBookingLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
      <Card className="w-full max-w-2xl md:max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r relative from-purple-500 via-purple-900 to-indigo-600 text-white p-3 md:p-6">
          <CardTitle className="text-2xl md:text-4xl font-bold text-center">{eventDetails?.title}</CardTitle>
          <CircleX onClick={onClose} className='w-6 h-6 absolute right-4'/>
        </CardHeader>
        <CardContent className="px-4 py-2 md:p-6 bg-gradient-to-b from-gray-50 to-white">
        <form onSubmit={handleSubmit(handleBookEvent)}>
          {/* Apply flex-row layout from md (medium) screen */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 space-y-2">
              {/* Display current username */}
              <div className="space-y-3">
                <Label className="text-md md:text-xl font-semibold text-gray-800">Welcome,{`${currentUser?.firstname} ${currentUser?.lastname}`} </Label>
              </div>

              {/* Conditionally render group members input or student information */}
              {eventDetails?.isGroupEvent ? (
                <>
                 <div className="flex flex-col space-y-1.5">
                 <Label htmlFor="group">Group Name</Label>
                 <Input id="groupName" placeholder="Enter Group Name" {...register("groupName")} />
               </div>
               <div className="flex flex-col space-y-1.5 pt-5">
               <Label htmlFor="member">Members</Label>
               <SelectorPrac selector={"participants"}  setValue={setValue}  />
               {/* <CoordinatorProvider>
                 <CoordinatorSelector selector={"participants"} setValue={setValue} />
               </CoordinatorProvider> */}
             </div>
             </>
              ) : (
                <div className="space-y-2 md:space-y-4 bg-white p-4">
                  <div className="flex items-center space-x-2 text-sm md:text-xl font-medium text-gray-700">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                    <span>
                      Year of Study:{" "}
                      <span className="font-semibold">{currentUser?.yearOfStudy || "NA"}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm md:text-xl font-medium text-gray-700">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <span>
                      Branch: <span className="font-semibold">{currentUser?.branch || "NA"}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm md:text-xl font-medium text-gray-700">
                    <Phone className="w-6 h-6 text-purple-600" />
                    <span>
                      Mobile Number:{" "}
                      <span className="font-semibold">{currentUser?.contact || "NA"}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Payment screenshot upload - for medium and large screens */}
              <div className="hidden md:block space-y-3">
                <Label htmlFor="payment-screenshot-desktop" className="text-md md:text-lg font-semibold flex items-center space-x-2 text-gray-700">
                  <Upload className="w-5 h-5" />
                  <span>Upload Payment Screenshot</span>
                </Label>
                <div className="mt-1 flex items-center space-x-2">
                  <Input id="payment-screenshot-desktop" 
                  type="file" 
                  accept="image/*"
                  className="flex-grow" 
                  onChange={(e) => handleFileChange(e)} />
                  {
                    file && 
                  <Button type="button" variant="outline"
                  className="bg-indigo-500 text-white hover:bg-purple-600"
                  onClick={(e) =>handleImageUpload(file)}
                  >
                    {
isLoading ?
                   <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : "Upload"
                    }
                  </Button>
                  }
                </div>
              </div>
            </div>

            {/* QR code, ticket price, and book ticket button */}
            <div className="md:w-72 space-y-2 md:space-y-4 mt-3 md:mt-0">
              <div className="flex flex-col items-center space-y-3 md:p-4 bg-gradient-to-b from-purple-50 to-indigo-50 rounded-lg shadow-md">
                <Label className="text-md md:text-lg font-semibold text-gray-800">Scan QR Code for Payment</Label>
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white shadow-inner flex items-center justify-center rounded-lg">
                  <img src={eventDetails?.qrImage} alt="" />
                </div>
                <div className="text-lg md:text-2xl font-bold text-purple-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {eventDetails?.price}
                </div>
              </div>

              {/* Payment screenshot upload - for small screens */}
              <div className="md:hidden space-y-3">
                <Label htmlFor="payment-screenshot-mobile" className="text-md font-semibold flex items-center space-x-2 text-gray-700">
                  <Upload className="w-5 h-5" />
                  <span>Upload Payment Screenshot</span>
                </Label>
                <div className="mt-1 flex flex-col space-y-2">
                  <Input 
                  id="payment-screenshot-mobile" 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e)}
                  className="w-full"
                   />
                   {
                    file && 

                  <Button type="button" variant="outline" className="w-full"
                  onClick={(e) =>handleImageUpload(file)}
                  >
                    { isLoading ?
                   <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : paymentScreenshot==="" ? "Upload" : "Uploaded"
                    }
                  </Button>
                   }
                  
                </div>
              </div>

              <Button onClick={handleBookEvent} className="w-full text-md md:text-lg py-4 md:py-6 bg-gradient-to-r from-purple-600 via-purple-800 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 text-white transition-all duration-300 shadow-lg rounded-lg">
              { isBookingLoading ?
              <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : "Book Ticket"
                    }
              </Button>
            </div>
          </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

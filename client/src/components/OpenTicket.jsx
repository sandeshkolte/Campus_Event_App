import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Upload, Plus, Users, DollarSign, GraduationCap, BookOpen, Phone, CrossIcon, X, CircleX, IndianRupee } from 'lucide-react';
import { FaClosedCaptioning } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function TicketBooking({ isOpen, onClose,eventDetails }) {
  const currentUser = useSelector((state)=>state.auth?.userInfo) // Replace with actual username from your state or props
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchMember, setSearchMember] = useState('');
  
console.log(currentUser);

  const handleAddMember = () => {
    if (searchMember && !groupMembers.includes(searchMember)) {
      setGroupMembers([...groupMembers, searchMember]);
      setSearchMember('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
      <Card className="w-full max-w-2xl md:max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r relative from-purple-600 via-pink-500 to-indigo-600 text-white p-3 md:p-6">
          <CardTitle className="text-2xl md:text-4xl font-bold text-center">{eventDetails?.title}</CardTitle>
          <CircleX onClick={onClose} className='w-6 h-6 absolute right-4'/>
        </CardHeader>
        <CardContent className="px-4 py-2 md:p-6 bg-gradient-to-b from-gray-50 to-white">
          {/* Apply flex-row layout from md (medium) screen */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 space-y-2">
              {/* Display current username */}
              <div className="space-y-3">
                <Label className="text-md md:text-xl font-semibold text-gray-800">Welcome,{`${currentUser?.firstname} ${currentUser?.lastname}`} </Label>
              </div>

              {/* Conditionally render group members input or student information */}
              {eventDetails?.isGroupEvent ? (
                <div className="space-y-3">
                  <Label htmlFor="search-member" className="text-sm md:text-lg font-semibold flex items-center space-x-2 text-gray-700">
                    <Users className="w-5 h-5" />
                    <span>Add Group Members</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="search-member"
                      placeholder="Enter member name"
                      value={searchMember}
                      onChange={(e) => setSearchMember(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="button" onClick={handleAddMember} variant="secondary" className="bg-purple-500 text-white hover:bg-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groupMembers.map((member, index) => (
                      <span key={index} className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
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
                  <Input id="payment-screenshot-desktop" type="file" accept="image/*" className="flex-grow" />
                  <Button type="button" variant="outline" className="bg-purple-500 text-white hover:bg-purple-600">
                    Upload
                  </Button>
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
                  <Input id="payment-screenshot-mobile" type="file" accept="image/*" className="w-full" />
                  <Button type="button" variant="outline" className="w-full">
                    Upload
                  </Button>
                </div>
              </div>

              <Button onClick={onClose} className="w-full text-md md:text-lg py-4 md:py-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 text-white transition-all duration-300 shadow-lg rounded-lg">
                Book Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

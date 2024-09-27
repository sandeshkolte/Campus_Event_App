import { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gamepad2, Music, Code, Pen } from "lucide-react";
import "react-profile/themes/default";
import { openEditor } from "react-profile";
import ProfileSidebar from "@/components/ProfileSidebar";

const initialInterestAreas = [
  {
    name: "Sports",
    icon: <Gamepad2 className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700",
    items: [
      { label: "Football" },
      { label: "Basketball" },
      { label: "Tennis" },
      { label: "Swimming" },
    ],
  },
  {
    name: "Culture",
    icon: <Music className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700",
    items: [
      { label: "Music" },
      { label: "Art" },
      { label: "Literature" },
      { label: "Theater" },
    ],
  },
  {
    name: "Programming",
    icon: <Code className="w-5 h-5" />,
    color: "bg-green-100 text-green-700",
    items: [
      { label: "Web Development" },
      { label: "Mobile Apps" },
      { label: "Data Science" },
      { label: "AI/Machine Learning" },
    ],
  },
];

export default function Profile() {
  const user = useSelector((state) => state.auth?.userInfo);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [profileImage, setProfileImage] = useState(
    user?.image ||
      "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
  );
  const fileInputRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName || "Ritesh");
  const [lastName, setLastName] = useState(user?.lastName || "Doijad");
  const [year, setYear] = useState(user?.year || "1");
  const [branch, setBranch] = useState(user?.branch || "cse");
  const [isEditable, setIsEditable] = useState(false);

  // No type annotations

  const handleFilterChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const change = async (e) => {
    const newImage = await openEditor({ src: e.target.files[0], square: true });
    console.log(newImage);
    if (newImage) {
      setProfileImage(newImage?.editedImage?.getDataURL());
    } else {
      console.error("Image editor returned no image.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-fit bg-gray-100">
      {/* Sidebar */}
    <ProfileSidebar/>
      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mr-5">
          <div>
            <h1 className="text-2xl font-bold">Hello "{user?.fullname}"</h1>
            <p className="text-gray-600 font-semibold mb-5">
              welcome to your Profile dashboard
            </p>
          </div>
          <Button
            onClick={toggleEdit}
            className="bg-gray-900 mb-3 sm:mb-0 mr-auto sm:mr-0 hover:bg-gray-700 text-white transition-colors duration-200 sm:ml-auto"
          >
            <Pen className="w-4 h-4 mr-2" />
            {isEditable ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
        <div className="flex gap-3 flex-col">
          {/* User Info Card */}
          <div className="gap-3 grid sm:grid-flow-row sm:grid-cols-6 lg:grid-rows-1 lg:grid-cols-8">
            {/* User Profile Card */}
            <Card className="bg-white py-12 px-16 rounded-3xl sm:col-span-2 lg:col-span-2">
              <div className="flex flex-col justify-center text-center items-center">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="User avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
                    onClick={triggerFileInput}
                    disabled={!isEditable}
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={change}
                    accept="image/jpeg;image/png"
                    className="hidden"
                    disabled={!isEditable}
                  />
                </div>
                <div className="mt-2">
                  <CardTitle className="text-lg text-gray-700">
                    {user?.fullname}
                  </CardTitle>
                  <p className="text-sm text-gray-500">+91 9075991567</p>
                </div>
              </div>
            </Card>
            {/* Personal Information Card */}
            <Card className="bg-white min-w-sm rounded-3xl lg:col-span-3 sm:col-span-4">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm text-gray-500"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      disabled={!isEditable}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm text-gray-500">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      disabled={!isEditable}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* interseted Area */}
            <Card className="w-full space-y-4 min-w-sm rounded-3xl p-5 sm:col-span-3 bg-white lg:col-span-3">
              <CardTitle className="text-xl text-gray-700 pb-2">
                Interested Area
              </CardTitle>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {initialInterestAreas.map((area, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={area.name}
                    className="border rounded-lg overflow-visible"
                  >
                    <Popover
                      open={openPopover === area.name}
                      onOpenChange={(open) =>
                        setOpenPopover(open ? area.name : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <AccordionTrigger
                          className={`p-2 ${area.color} hover:brightness-95 transition-all`}
                        >
                          <div className="flex items-center space-x-3">
                            {area.icon}
                            <span className="font-semibold">{area.name}</span>
                          </div>
                        </AccordionTrigger>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-0" align="start">
                        <div className="p-3 bg-gray-50 space-y-1">
                          {area.items.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center p-2 rounded bg-white shadow-sm hover:bg-gray-100 transition-colors"
                            >
                              <Checkbox
                                id={`${area.name}-${item.label}`}
                                checked={selectedFilters.includes(item.label)}
                                onCheckedChange={() =>
                                  handleFilterChange(item.label)
                                }
                                disabled={!isEditable}
                                className="mr-3"
                              />
                              <label
                                htmlFor={`${area.name}-${item.label}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
            {/* Academic Information Card */}
            <Card className="w-full min-w-sm  bg-white sm:col-span-3 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Student Year</Label>
                  <Select
                    disabled={!isEditable}
                    value={year}
                    onValueChange={setYear}
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="1"
                      >
                        1st Year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="2"
                      >
                        2nd Year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="3"
                      >
                        3rd Year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="4"
                      >
                        4th Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    disabled={!isEditable}
                    value={branch}
                    onValueChange={setBranch}
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="cse"
                      >
                        CSE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="entc"
                      >
                        ENTC
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="me"
                      >
                        ME
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="ce"
                      >
                        CE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="ee"
                      >
                        EE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="ie"
                      >
                        IE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {/* Security Card */}
            <Card className="bg-white rounded-3xl sm:col-span-6 lg:col-span-5">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-gray-500">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={user?.email || ""}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm text-gray-500">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value="••••••"
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm text-gray-500"
                    >
                      Phone number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value="PhoneNumber"
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex w-[60%] flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl text-green-500 font-bold border-green-500 border-2 hover:bg-green-100"
                  >
                    Change password
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl text-green-500 font-bold border-green-500 border-2 hover:bg-green-100"
                  >
                    Change phone number
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

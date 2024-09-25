import { useState,useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const user = useSelector((state) => state.auth.userInfo);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [profileImage, setProfileImage] = useState(user?.image || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg")
  const fileInputRef = useRef(null)

  console.log(user);

  // No type annotations

  const handleFilterChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const clearAll = () => {
    setSelectedFilters([]);
  };

  const change = async (e) => {
    const newImage = await openEditor({ src: e.target.files[0] });
    console.log(newImage)
    if (newImage) {
        setProfileImage(newImage?.editedImage?.getDataURL());
    } else {
        console.error("Image editor returned no image.");
    }
};

   const triggerFileInput = () => {
    fileInputRef.current.click();
   };

  return (
    <div className="flex flex-col lg:flex-row min-h-fit bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white p-10 lg:min-h-fit">
        <nav className="space-y-2">
          <a
            href="#"
            className="block py-2 px-4 text-blue-600 bg-blue-50 rounded"
          >
            User Profile
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Orders
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Subscriptions
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Address
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Payments
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Wishlist
          </a>
        </nav>
        <button className="mt-8 flex items-center text-red-500 hover:text-red-600">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-2">User profile</h1>
        <p className="text-gray-600 mb-5">
          Manage your details, view your tier status and change your password.
        </p>

        <div className="flex gap-3 flex-col">
          {/* User Info Card */}
          <div className="gap-3 grid grid-flow-row sm:grid-flow-row sm:grid-cols-6 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-8">
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
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={change}
                    accept="image/jpeg;image/png"
                    className="hidden"
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

            <Card className="bg-white min-w-sm rounded-3xl lg:col-span-3 sm:col-span-4">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  General information
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
                      value="Ritesh"
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
                      value="Doijad"
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  Update
                </Button>
              </CardContent>
            </Card>
            <Card className="w-full max-w-sm md:max-h-72 rounded-3xl p-5  sm:col-span-6 bg-white md:overflow-y-auto lg:col-span-3">
              <CardTitle className="text-xl text-gray-700 pb-2">
                Interested Area
              </CardTitle>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {initialInterestAreas.map((area, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={area.name}
                    className="border rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger
                      className={`p-2 ${area.color} hover:brightness-95 transition-all`}
                    >
                      <div className="flex items-center space-x-3">
                        {area.icon}
                        <span className="font-semibold">{area.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-50">
                      <div className="space-y-3">
                        {area.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center p-2 rounded bg-white shadow-sm hover:bg-gray-100 transition-colors"
                          >
                            <Checkbox
                              id={item.label}
                              checked={selectedFilters.includes(item.label)}
                              onCheckedChange={() =>
                                handleFilterChange(item.label)
                              }
                              className="mr-3"
                            />
                            <label
                              htmlFor={item.label}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                            >
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="outline"
                className="w-full mt-3 text-primary hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                onClick={clearAll}
              >
                Clear All Selections
              </Button>
            </Card>
          </div>

          {/* Security Card */}
          <Card className="bg-white rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-700">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-500">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user?.email}
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
      </main>
    </div>
  );
}

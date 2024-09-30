import { useState, useRef, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gamepad2, Music, Code, Pen } from "lucide-react";
import "react-profile/themes/default";
import { openEditor } from "react-profile";
import ProfileSidebar from "@/components/ProfileSidebar";
import { login, updateUserInfo } from "@/store/authSlice";
import axios from "axios";
import { baseUrl } from "@/common/common";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.userInfo);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [profileImage, setProfileImage] = useState(
    user?.image ||
      "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
  );
  const fileInputRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [securityChange ,setSecurityChange]=useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    yearOfStudy: "",
    branch: "",
    // profileImage: "",
    interests: [],
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        yearOfStudy: user.yearOfStudy || "",
        branch: user.branch || "",
        // profileImage: user.image || "default-image-url",
        interests: user.interests || [],
        email: user.email || "",
        contact: user.contact || "90759******",
      });
      setSelectedFilters(user.interests || []);
    }
  }, [user]);

  const handleFilterChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const change = async (e) => {
    const newImage = await openEditor({ src: e.target.files[0], square: true });
    if (newImage) {
      setProfileImage(newImage?.editedImage?.getDataURL());
      setFormData((prev) => ({
        ...prev,
        profileImage: newImage?.editedImage?.getDataURL(), 
      }));
    } else {
      console.error("Image editor returned no image.");
      toast.error("Image editor returned no image.")
    }
  };
  

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const toggleEdit = () => {
    if (isEditable) {
      handleUpdateUserInfo();
    }
    setIsEditable((prev) => !prev);
  };

  const handleUpdateUserInfo = async () => {
    const updatedInfo = {
        ...formData,
        interests: selectedFilters,
        password: user?.password,
    };

    // Check if formData has changed
    const hasChanged = Object.keys(updatedInfo).some(
        (key) => updatedInfo[key] !== user[key]
    );

    if (!hasChanged) {
        toast.info("No changes made."); // Display toast if no changes
        return; // Exit the function early
    }

    try {
        const response = await axios.post(`${baseUrl}/api/user/update/${user._id}`, updatedInfo);

        if (response.status === 200) {
            dispatch(updateUserInfo(response.data));

            setFormData((prev) => ({
                ...prev,
                ...response.data, 
                interests: selectedFilters, 
            }));
            setSelectedFilters(response.data.interests || []);
            toast.success("Profile updated successfully.");
        }
    } catch (err) {
        console.log("Failed to update profile. Please try again.");
        toast.error("Failed to update profile. Please try again.");
    } finally {
        fetchUserDetails();
    }
};

const fetchUserDetails = async () => {
  try {
    if (user._id) {
      axios.post(baseUrl + `/api/user/getuser/?userid=${user._id}`).then((result) => {
        if (result.status === 200) {
          const userDetails = result.data.response
          dispatch(login(userDetails))
        }
      })
    }

  } catch (err) {
    console.log(err)
  }
}

const toggleSecurityChange=()=>{
  if(securityChange){
    handleUpdateUserInfo()
  }
  setSecurityChange((prev)=>!prev)
}

  return (
    <div className="flex flex-col lg:flex-row min-h-fit bg-gray-100">
      {/* Sidebar */}
      <ProfileSidebar />
      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mr-5">
          <div>
            <h1 className="text-2xl font-bold">Hello "{user?.firstname}"</h1>
            <p className="text-gray-600 font-semibold mb-5">
              welcome to your Profile dashboard
            </p>
          </div>
          <Button
            onClick={toggleEdit}
            disabled={securityChange}
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
            <Card className="bg-white hover:bg-blue-50 transition-colors duration-200 py-12 px-16 rounded-3xl sm:col-span-2 lg:col-span-2">
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
                      {user?.firstname}
                  </CardTitle>
                  <p className="text-sm text-gray-500">+91{user?.contact || "907599****"}</p>
                </div>
              </div>
            </Card>
            {/* Personal Information Card */}
            <Card className="bg-white hover:bg-blue-50 transition-colors duration-200 min-w-sm rounded-3xl lg:col-span-3 sm:col-span-4">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstname"
                      className="text-sm text-gray-500"
                    >
                      First name
                    </Label>
                    <Input
                      id="firstname"
                      value={formData.firstname}
                      disabled={!isEditable}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstname: e.target.value,
                        }))
                      } // Update state on change
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-sm text-gray-500">
                      Last name
                    </Label>
                    <Input
                      id="lastname"
                      value={formData.lastname}
                      disabled={!isEditable}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastname: e.target.value,
                        }))
                      }
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* interseted Area */}
            <Card className="w-full hover:bg-blue-50 transition-colors duration-200 space-y-4 min-w-sm rounded-3xl p-5 sm:col-span-3 bg-white lg:col-span-3">
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
            <Card className="w-full min-w-sm  bg-white hover:bg-blue-50 transition-colors duration-200 sm:col-span-3 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Student year</Label>
                  <Select
                    disabled={!isEditable}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, yearOfStudy: value }))
                    }
                  >
                    <SelectTrigger id="year">
                      <SelectValue
                        placeholder={formData.yearOfStudy || "Select your Study year"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="1st year"
                      >
                        1st year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="2nd year"
                      >
                        2nd year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="3rd year"
                      >
                        3rd year
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="4th year"
                      >
                        4th year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    disabled={!isEditable}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, branch: value }))
                    }
                  >
                    <SelectTrigger id="branch">
                      <SelectValue
                        placeholder={formData?.branch || "Select branch"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="CSE"
                      >
                        CSE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="ENTC"
                      >
                        ENTC
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="ME"
                      >
                        ME
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="CE"
                      >
                        CE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="EE"
                      >
                        EE
                      </SelectItem>
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer"
                        value="IE"
                      >
                        IE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {/* Security Card */}
            <Card className="bg-white hover:bg-blue-50 transition-colors duration-200 rounded-3xl sm:col-span-6 lg:col-span-5">
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
                      disabled={!securityChange}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      value={formData.email || "example@gamil.com"}
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm text-gray-500">
                      Password
                    </Label>
                    <Input
                     disabled={!securityChange}
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
                      id="contact"
                      value={formData.contact}
                      disabled={!securityChange}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }))
                      } // Update state on change
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div className="">
                  <Button
                  onClick={toggleSecurityChange}
                  disabled={isEditable}
                    variant="outline"
                    className="flex-1 rounded-xl text-green-500 font-bold border-green-500 border-2 hover:bg-green-100"
                  >
                    {securityChange ? "Save Changes" : "Change Security Setting"}
                    
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

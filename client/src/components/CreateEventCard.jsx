import * as React from "react"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import DatePicker from "react-datepicker"
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "@/common/common"
import { storage } from "../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { VscLoading } from "react-icons/vsc"
import { CalendarIcon, Upload } from "lucide-react"
import CategorySelector from "./CategorySelector"
import { jwtDecode } from "jwt-decode"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SelectorPrac from "./SelectorPrac"

export default function Component() {
  const { register, handleSubmit, reset, setValue } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(null)
  const [uploadedFile, setUploadedFile] = React.useState(null)
  const [qrPreview, setQRPreview] = React.useState(null)
  const [uploadedQRFile, setUploadedQRFile] = React.useState(null)
  const [startDateTime, setStartDateTime] = React.useState(null)
  const [endDateTime, setEndDateTime] = React.useState(null)
  const [isGroupEvent, setisGroupEvent] = React.useState(false)
  const [isAuditCourse, setisAuditCourse] = React.useState(false)

  // const [query, setQuery] = useState("");
  const [userLoading, setUserLoading] = React.useState(false);

  // const fetchSearchResults = debounce(async (searchQuery) => {
  //   setUserLoading(true);
  //   try {
  //     const response = await axios.get( baseUrl+ "/api/user/userrole/?role=user,admin", searchQuery);
  //     setResults(response.data.events);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setUserLoading(false);
  // }, 300);

  const handleImageUpload = (file, folderName) => {
    return new Promise((resolve, reject) => {
      if (!file) reject("No file provided");

      const storageRef = ref(storage, `${folderName}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          toast.error("Image upload failed!");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "eventImage") {
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (type === "qrImage") {
        setUploadedQRFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setQRPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  // const updateUserRoleToAdmin = async (userId) => {
  //   try {
  //     const response = await axios.put( baseUrl + `/api/user/updateRole`, { userId, role: "admin" });
  //     if (response.status === 200) {
  //       console.log(`User role updated to admin for userId: ${userId}`);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update user role:", error);
  //     toast.error("Failed to update user role.");
  //   }
  // };


  // Function to update 'eventsorganised' field
  const addtoOrganisedEvent = async (userId, eventId) => {
    try {
      await axios.post(`${baseUrl}/api/user/addOrganisedEvent`, { userId, eventId });
      // if (response.status === 200) {
        console.log(`Event added to organised event`);
      // }
    } catch (error) {
      console.error("Failed to add event to user:", error);
      // toast.error("Failed to add event to user.");
    }
  };

  const token = localStorage.getItem("userToken");
  let userId = null;

  if (token && token.includes(".")) {
    try {
      const decodedToken = jwtDecode(token);

      userId = decodedToken.id; // Assuming you have userId in the token
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const formSubmit = async (data) => {
    setLoading(true);

    if (data.price < 0) {
      toast.error("Price cannot be negative.");
      setLoading(false);
      return;
    }

    if (data.price === null || data.price === "") {
      data.price = 0
    }

    // Check if it's a group event and validate participant size
    if (isGroupEvent && (!data.participantSize || data.participantSize < 1)) {
      toast.error("Please enter a valid group size.");
      setLoading(false);
      return;
    }


    try {
      const eventFolderName = `events/${new Date().toISOString()}`; // Create a unique folder name for each event
      const file = uploadedFile;
      const qrFile = uploadedQRFile; // Assuming you have set this when handling QR code file input

      if (file) {
        const downloadURL = await handleImageUpload(file, eventFolderName);
        data.image = downloadURL; // Store the event image URL
      }

      if (qrFile) {
        const qrDownloadURL = await handleImageUpload(qrFile, eventFolderName); // Upload QR image
        data.qrImage = qrDownloadURL; // Store the QR code image URL
      }

      data.isGroupEvent = isGroupEvent;
      if (!isGroupEvent) {
        data.participantSize = 1; // For individual events, default size is 1
      }
      data.isAuditCourse = isAuditCourse;

      if (userId) {
        data.organisedBy = `${userId}`
      }
      // Create the event

      // console.log("The created data: ", data);

      const eventResponse = await axios.post(`${baseUrl}/api/event/create`, data);
      const eventId = eventResponse.data._id; // Get the new event ID
      // if (eventResponse.status === 201) {
      // console.log("Event created successfully", eventResponse.data);
      toast.success("Event created successfully!");

      // console.log("Eventid: ",eventId);
      
      // Update 'eventsorganised' field for coordinators
      addtoOrganisedEvent(`${userId}`, eventId),
   

      reset(); // Reset the form fields
      setImagePreview(null); // Reset the image preview
      setUploadedFile(null); // Reset the uploaded file state
      setQRPreview(null); // Reset QR preview
      setUploadedQRFile(null); // Reset uploaded QR file state
      // navigate("/"); // Navigate to the home route
      // window.location.reload();
      // }
    } catch (err) {
      toast.error("Failed to create event " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full md:max-w-5xl">
      <form onSubmit={handleSubmit(formSubmit)}>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Fill in the details for your new event.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Title <span className="text-red-500" >*</span></Label>
              <Input id="title" placeholder="Enter event title" {...register("title")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" {...register("price")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 sm:col-span-1">
              <Label htmlFor="description">Description <span className="text-red-500" >*</span></Label>
              <Textarea id="description" placeholder="Describe your event" rows={6} {...register("description")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 sm:col-span-1">
              <div className="space-y-2">
                <Label htmlFor="image">Upload Event Banner <span className="text-red-500" >*</span></Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-full">
                    <Input
                      id="image"
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleFileChange(e, "eventImage")}
                      accept="image/*"
                    />
                    <Label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-700">
                            Upload Event Banner
                          </span>
                        </div>
                      )}
                    </Label>
                  </div>
                  {imagePreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImagePreview(null);
                        setUploadedFile(null);
                      }}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <hr className="bg-black " />
              <div className="grid w-full max-w-sm items-center gap-1.5 sm:col-span-1 mt-5">
                <div className="space-y-2">
                  <Label htmlFor="qrImage" className={"text-xl"}>✔️ Add Payment QR</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full">
                      <Input
                        id="qrImage"
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, "qrImage")}
                        accept="image/*"
                      />
                      <Label
                        htmlFor="qrImage"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        {qrPreview ? (
                          <img
                            src={qrPreview}
                            alt="QR Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-700">
                              Upload QR Image
                            </span>
                          </div>
                        )}
                      </Label>
                    </div>
                    {qrPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setQRPreview(null);
                          setUploadedQRFile(null);
                        }}
                        className="w-full"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Participation type */}
            <div className="p-8 flex flex-col gap-5 " >
              <Label htmlFor="">Participation Type</Label>
              <div className="flex gap-x-10 " >
                <RadioGroup
                  defaultValue={false}
                  onValueChange={(value) => {
                    setisGroupEvent(value)
                    setValue("isGroupEvent", value)
                  }

                  }
                >
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem value={false} id="r1" />
                    <Label htmlFor="r1">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={true} id="r2" />
                    <Label htmlFor="r1">Group</Label>
                  </div>
                </RadioGroup>
                {isGroupEvent && <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="participantSize">Enter Group Size</Label>
                  <Input id="participantSize" required type="number" className={"w-20"} placeholder="2" min={2} {...register("participantSize", { min: 2 })} />
                </div>}
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5 font-semibold">
              <Label htmlFor="organizers">Organizing Committe <span className="text-red-500" >*</span></Label>
              <Select onValueChange={(value) => setValue("organizingBranch", value)}>
                <SelectTrigger id="organizers">
                  <SelectValue placeholder="Select Committe" />
                </SelectTrigger>
                <SelectContent className="bg-white  font-semibold">
                  <SelectItem value={"Abhirang"}>
                    Abhirang
                  </SelectItem>
                  <SelectItem value={"Technotsav"}>
                    Technotsav
                  </SelectItem>
                  <SelectItem value={"ACSES"}>
                    ACSES
                  </SelectItem>
                  <SelectItem value={"EESA"}>
                    EESA
                  </SelectItem>
                  <SelectItem value={"MESA"}>
                    MESA
                  </SelectItem>
                  <SelectItem value={"CESA"}>
                    CESA
                  </SelectItem>
                  <SelectItem value={"ETESA"}>
                    ETESA
                  </SelectItem>
                  <SelectItem value={"INSA"}>
                    INSA
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="p-8 flex flex-col gap-5" >
                <Label htmlFor="">Audit Course</Label>
                <div className="flex gap-x-10" >
                  <RadioGroup
                    defaultValue={false}
                    onValueChange={(value) => {
                      setisAuditCourse(value)
                      setValue("isAuditCourse", value)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={false} id="a1" />
                      <Label htmlFor="a1">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={true} id="a2" />
                      <Label htmlFor="a2">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 w-[280px]">
              <Label htmlFor="coordinator">Coordinators <span className="text-red-500" >*</span></Label>
              <SelectorPrac selector={"coordinator"} setValue={setValue} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="category">Category <span className="text-red-500" >*</span></Label>
              <CategorySelector setValue={setValue} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="venue">Venue <span className="text-red-500" >*</span></Label>
              <Input id="venue" placeholder="Enter event venue" {...register("venue")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">Start Date <span className="text-red-500" >*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-semibold",
                      !startDateTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDateTime ? format(startDateTime, "PPP p") : <span>Pick a date and time</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    selected={startDateTime}
                    onChange={(date) => {
                      setStartDateTime(date);
                      setValue("startDate", date); // Update form value
                      // Reset end date if it's before or the same as the new start date
                      if (endDateTime && date >= endDateTime) {
                        setEndDateTime(null);
                      }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()} // Start time cannot be in the past
                    inline
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">End Date <span className="text-red-500" >*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-semibold",
                      !endDateTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDateTime ? format(endDateTime, "PPP p") : <span>Pick a date and time</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DatePicker
                    selected={endDateTime}
                    onChange={(date) => {
                      setEndDateTime(date);
                      setValue("endDate", date); // Update form value
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={startDateTime || new Date()} // End date cannot be before start date
                    minTime={startDateTime && endDateTime && startDateTime.toDateString() === endDateTime.toDateString() ? startDateTime : new Date(0, 0, 0, 0, 0, 0, 0)} // Ensure end time is after start time
                    maxTime={new Date(0, 0, 0, 23, 59, 59, 999)} // Maximum time set to the end of the day
                    inline
                  />
                </PopoverContent>
              </Popover>
            </div>



          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {
            reset()
            setImagePreview(null)
            setUploadedFile(null)
            setQRPreview(null)
            setUploadedQRFile(null)
            navigate("/")
          }}>Cancel</Button>
          <Button type="submit" className="bg-gray-950 text-white">
            {loading ? <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : "Create Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

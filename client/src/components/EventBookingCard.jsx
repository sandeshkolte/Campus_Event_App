import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Ticket, X } from "lucide-react"
import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { baseUrl } from "@/common/common"

export default function EventBookingCard() {
  // const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)
  const { register, handleSubmit, reset, setValue } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(null)
  const [uploadedFile, setUploadedFile] = React.useState(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleCancelUpload = () => {
    setImagePreview(null)
    fileInputRef.current.value = null
  }


  const handleImageUpload = async (file) => {
    setLoading(true); // Set loading to true before the upload starts
    try {
      if (!file) throw new Error("No file provided");
  
      const formData = new FormData();
      formData.append("file", file); // The file to upload
      formData.append("upload_preset", "user_payments"); // Your Cloudinary upload preset
      formData.append("folder", "users/user_uploads/payment_ss"); // Specify the folder path
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/diayircfv/image/upload`,
        formData
      );
  
      toast.success("Image uploaded successfully!"); // Show success toast
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      toast.error(`Image upload failed: ${error.message || "Unknown error"}`); // Show error toast
      throw error; // Rethrow the error to handle it upstream
    } finally {
      setLoading(false); // Set loading to false after the upload is complete
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  
  const token = localStorage.getItem("userToken")
  const userId = jwtDecode(String(token)).id

  const handleTicketBooking = async () => {
    setLoading(true); // Start the loading spinner
    try {
      const file = uploadedFile;
      let paymentImage;
      
      // If there is a file, upload it to Firebase
      if (file) {
        const downloadURL = await handleImageUpload(file);
        paymentImage = downloadURL;
      }
  
      // Call the API to book the event (adding the event to user's booked events)
      const userResponse = await axios.post(`${baseUrl}/api/user/addMyEvent`, {
        userId: `${userId}`,
        eventId: `${id}`,
        paymentImage,
      });
  
      // Call the API to add the user as a participant in the event
      const eventResponse = await axios.post(`${baseUrl}/api/event/addParticipants`, {
        eventId: `${id}`,
        userId:`${userId}`
      });
  
      // Check if the request was successful
      if (userResponse.status === 201 && eventResponse.status === 201) {
        toast.success("Event Booked successfully!");
  
        // Reset form, image preview, and uploaded file
        reset();
        setImagePreview(null);
        setUploadedFile(null);
  
        // Navigate to the tickets page and reload the page
        navigate("/mytickets");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Failed to book the event: " + err.message);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  const { id } = useParams()
  const events = useSelector((state) => state.event?.events)
  const eventDetails = events?.find((event) => event._id === id)

  if (!eventDetails) {
    return <div className="flex justify-center">Loading...</div>
  }

  return (
    <div className="h-screen overflow-hidden"> {/* Make the entire page non-scrollable */}
      <Card className="w-full h-full mx-auto max-h-screen"> {/* Limit the card's max height to screen */}
        <CardContent className="p-6 flex flex-col-reverse md:flex-row gap-6 h-full"> {/* Ensure content takes full height */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="relative flex justify-center w-full">
              <div>
                <h3 className="text-center text-2xl font-semibold">Payment details</h3>
                <img
                  src="/public/qr_image.png"
                  id="qr_image"
                  height={300}
                  width={300}
                  alt="Payment QR image"
                  layout="fill"
                  className="rounded-md"
                />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
            />

            {!imagePreview ? (
              <Button variant="outline" className="w-full" onClick={triggerFileInput}>
                <Camera className="mr-2 h-4 w-4" />
                Upload Screenshot
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm">Selected Image: {imagePreview.name}</p>
                <div className="flex space-x-4">
                  <Button variant="outline" className="w-full" onClick={triggerFileInput}>
                    Change Image
                  </Button>
                  <Button variant="outline" className="w-full text-red-600" onClick={handleCancelUpload}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button className="w-full bg-gray-950 text-white mt-4" onClick={handleTicketBooking} >
              <Ticket className="mr-2 h-4 w-4" />
              Book Ticket
            </Button>
          </div>

          <div className="grid grid-rows-3 w-full md:w-1/2 space-y-6 overflow-auto"> {/* Add overflow-auto to scroll within the half page if needed */}
            <div className="relative row-span-1 rounded-lg bg-black text-white space-y-4 overflow-clip shadow-inner shadow-black ">
              <img src={eventDetails.image} alt="event image" className="object-fill" />
              <div className="absolute bottom-2 px-2" >
              <h2 className="text-2xl font-bold">{eventDetails.title}</h2>
              <p>{eventDetails.description}</p>
              </div>
            </div>

            <div className="row-span-2 bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-orange-200 rounded-md"></div>
                <div>
                  <h3 className="font-semibold">Standard Ticket</h3>
                  <p className="text-lg font-bold">$50 / person</p>
                </div>
              </div>

              <div>
                <p>{eventDetails.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

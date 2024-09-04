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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function Component() {
  const { register, handleSubmit, reset, setValue } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(null)
  const [uploadedFile, setUploadedFile] = React.useState(null)

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) reject("No file provided")

      const storageRef = ref(storage, `eventimages/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Image upload failed!")
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

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

  const formSubmit = async (data) => {
    setLoading(true)
    try {
      const file = uploadedFile
      if (file) {
        const downloadURL = await handleImageUpload(file)
        data.image = downloadURL
      }

      console.log(data)

      await axios.post(baseUrl + "/api/event/create", data).then(result => {
        if (result.status === 200) {
          console.log("Event created successfully", result.data)
          toast.success("Event created successfully!")
          reset() // Reset the form fields
          setImagePreview(null) // Reset the image preview
          navigate("/") // Navigate to the home route
        }
      })
    } catch (err) {
      toast.error("Failed to create event: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-6xl">
      <form onSubmit={handleSubmit(formSubmit)} >
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Fill in the details for your new event.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter event title" {...register("title")} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="0.00" {...register("price")} />
            </div>
            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your event" rows={4} {...register("description")} />
            </div>
            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-full">
                    <Input
                      id="image"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                      {...register("file")}
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
                            Upload Image
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
                        setImagePreview(null)
                        setUploadedFile(null)
                      }}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coordinator">Coordinator</Label>
              <Select onValueChange={(value) => setValue("coordinator", value)}>
                <SelectTrigger id="coordinator">
                  <SelectValue placeholder="Select coordinator" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" placeholder="Enter event venue" {...register("venue")} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {
            reset()
            setImagePreview(null)
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

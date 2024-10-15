import { baseUrl } from '@/common/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'; // Cross icon for modal close
import { useSelector } from 'react-redux';

const PhotoGallery = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To store selected file
  const [photos, setPhotos] = useState([]); // To store fetched photos
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // To handle clicked image for modal
  const userInfo = useSelector((state) => state.auth?.userInfo);

  // Function to handle photo metadata upload to MongoDB
  const fileUploadMongo = async (imageUrl, displayName) => {
    try {
      setLoading(true);
      const imageResponse = await axios.post(baseUrl + "/api/gallery/upload-photo", {
        title: "", // Add title if needed
        imageName: displayName,
        imageUrl: imageUrl,
      });

      if (imageResponse.status === 201) {
        toast.success("Photo uploaded successfully!");
        getAllPhotos(); // Fetch all photos again after upload
      }
    } catch (err) {
      toast.error("Failed to upload: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (displayName) => {
    try {
      setLoading(true);
      const imageResponse = await axios.post(baseUrl + "/api/gallery/delete-image", {
        imageName: displayName,
      });

      if (imageResponse.status === 200) {
        toast.success("Photo Deleted successfully!");
        getAllPhotos();
      }
    } catch (err) {
      toast.error("Failed to delete: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  // Function to handle file upload to Cloudinary
  const handleFileUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "eventify_gallery"); // Set up in Cloudinary
    formData.append("cloud_name", "diayircfv");

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/diayircfv/image/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadImageURL = await response.json();
      console.log(uploadImageURL);

      // Pass the image URL and name to fileUploadMongo
      fileUploadMongo(uploadImageURL.url, uploadImageURL.original_filename);
    } catch (err) {
      toast.error("Failed to upload image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get all photos from MongoDB
  const getAllPhotos = () => {
    try {
      axios.get(baseUrl + "/api/gallery/")
        .then(result => {
          console.log(result.data);
          setPhotos(result.data); // Store fetched photos
        })
        .catch(err => {
          toast.error(err.message);
        });
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Fetch all photos on component mount
  useEffect(() => {
    getAllPhotos();
  }, []);

  // Function to handle modal close
  const closeModal = () => {
    setSelectedImage(null); // Close the modal by resetting selectedImage
  };

  return (
    <div className='mt-5 md:mx-10'>
      <div>
        <h3 className='text-5xl font-medium py-5'>Photo Gallery</h3>
        {
userInfo?.role === "admin" &&
        <div className='grid grid-cols-5 md:flex' >
        <input
          type="file"
          className='col-span-3'
          onChange={(e) => setSelectedFile(e.target.files[0])} // Store selected file
        />
        <button
          className=' col-span-2 bg-gray-900 py-1 px-3 text-white rounded-md text-sm'
          onClick={handleFileUpload} // Upload photo on button click
        >
          {
            loading ? <VscLoading className="text-white animate-spin-slow text-2xl text-bold" /> : "Add Photo"
          }
        </button>
        </div>
        }
      </div>

      <div className='gallery mt-5 grid grid-cols-2 md:grid-cols-5 gap-2'>
        {/* Display the uploaded photos */}
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo._id} className="photo-item relative">
              <img 
                src={photo.imageUrl.replace('/upload/', '/upload/w_300/')} 
                alt={photo.imageName} 
                className='cursor-pointer'
                onClick={() => setSelectedImage(photo.imageUrl)} // Open modal with original image
              />
              {
                userInfo?.role === "admin" &&
              <button 
              className='absolute bottom-2 left-2 text-red-700 bg-white text-xl' 
              onClick={(e) =>deleteImage(photo.imageName)}
            >
              <AiFillDelete />
            </button>
              }
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
          <div className='relative'>
            <img src={selectedImage} alt="Full size" className='max-w-full max-h-screen' />
            <button 
              className='absolute top-2 right-2 text-black text-3xl' 
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;

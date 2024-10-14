const galleryModel = require('../models/gallery')


const getPhotos = async(req,res) => {
        try {
      const photo = await galleryModel.find()
      if (!photo) {
        return res.status(404).json({ message: "photo not found" });
      }
      res.status(200).json(photo);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve photo", error: error.message });
    }
}

const uploadImage = async(req,res) => {
let {title,imageName,imageUrl,uploadedBy} = req.body

try{
    const imageData = await galleryModel.create({
        title,imageName,imageUrl,uploadedBy
    })

    res.status(201).json({
        status:"success",
        response:"Photo Uploaded Successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload", error: error.message });
    }
}

const deleteImage = async(req,res) => {
    let {imageName} = req.body
    
    try{
        const imageData = await galleryModel.findOneAndDelete({
            imageName
        })
    
        res.status(200).json({
            status:"success",
            response:"Photo Deleted Successfully"
          });
        } catch (error) {
          res.status(500).json({ message: "Failed to Delete", error: error.message });
        }
    }

    module.exports= {uploadImage,deleteImage,getPhotos}
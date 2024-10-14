const express = require('express')
const { uploadImage, deleteImage, getPhotos } = require('../controller/galleryController')

const router = express.Router()

router.get('/', getPhotos);
router.post('/upload-photo',uploadImage)
router.post('/delete-image',deleteImage)

module.exports = router

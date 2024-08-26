const express = require('express')
const {registerUser,loginUser, getUserDetails} = require('../controller/userController')

const upload = require('../config/multer-config').default
const router = express.Router()

router.post('/register',upload.single("image"),registerUser)
router.post('/login',upload.single("image"), loginUser)
router.post('/getuser', getUserDetails)

module.exports = router
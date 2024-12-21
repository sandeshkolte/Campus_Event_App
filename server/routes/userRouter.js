const express = require('express')
const {registerUser,loginUser, getUserDetails,  
    userUpdate, updateUserRole, addOrganisedEvent, deleteUser,
    googleLogin,
    getUsersByName,
    // addMyEvent
} 
    = require('../controller/userController')

// const upload = require('../config/multer-config')
const checkTokenExpiry = require('../middlewares/check-token-expiry')
const router = express.Router()

router.post('/register',checkTokenExpiry,registerUser)
router.post('/login',checkTokenExpiry, loginUser)
router.post('/google', googleLogin)
router.get('/getuser/:userid', getUserDetails)
router.post('/getallusers', getUsersByName)
router.post('/update/:id', userUpdate)
router.post('/delete', deleteUser)
router.post("/updateRole", updateUserRole);
router.post("/addOrganisedEvent", addOrganisedEvent);
// router.post("/addMyEvent", addMyEvent);

module.exports = router
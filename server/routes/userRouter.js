const express = require('express')
const {registerUser,loginUser, getUserDetails, getUserByRole, 
    userUpdate, updateUserRole, addOrganisedEvent, deleteUser,
    googleLogin,
    // addMyEvent
} 
    = require('../controller/userController')

// const upload = require('../config/multer-config')
const checkTokenExpiry = require('../middlewares/check-token-expiry')
const router = express.Router()

router.post('/register',checkTokenExpiry,registerUser)
router.post('/login', loginUser)
router.post('/google', googleLogin)
router.post('/getuser', getUserDetails)
router.get('/userrole', getUserByRole)
router.post('/update/:id', userUpdate)
router.post('/delete', deleteUser)
router.post("/updateRole", updateUserRole);
router.post("/addOrganisedEvent", addOrganisedEvent);
// router.post("/addMyEvent", addMyEvent);

module.exports = router
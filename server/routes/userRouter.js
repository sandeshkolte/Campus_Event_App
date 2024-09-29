const express = require('express')
const {registerUser,loginUser, getUserDetails, getUserByRole, 
    userUpdate, updateUserRole, addOrganisedEvent, deleteUser,
    // addMyEvent
} 
    = require('../controller/userController')

const upload = require('../config/multer-config')
const router = express.Router()

router.post('/register',upload.single("image"),registerUser)
router.post('/login', loginUser)
router.post('/getuser', getUserDetails)
router.get('/userrole', getUserByRole)
router.post('/update/:id', userUpdate)
router.post('/delete', deleteUser)
router.post("/updateRole", updateUserRole);
router.post("/addOrganisedEvent", addOrganisedEvent);
// router.post("/addMyEvent", addMyEvent);

module.exports = router
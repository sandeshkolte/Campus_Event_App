const express = require('express')
const { getEvent, createEvent, findEvent, editEvent, deleteEvent, updateEvent } = require('../controller/eventController')
const router = express.Router()
const upload = require('../config/multer-config')

router.get('/',getEvent)
router.post('/create',upload.single("image"), createEvent)
router.post('/find', findEvent);
router.get('/edit/:id',editEvent)
router.get('/delete/',deleteEvent)
router.post('/update/:id',upload.single("image"), updateEvent)

module.exports = router
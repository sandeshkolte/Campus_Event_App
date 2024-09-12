const express = require('express')
const { getEvent, createEvent, editEvent, deleteEvent, updateEvent, findEventByTitle, findEventByCategory } = require('../controller/eventController')
const router = express.Router()
const upload = require('../config/multer-config')

router.get('/',getEvent)
router.post('/create', createEvent)
router.get('/find', findEventByTitle);
// router.get('/find', findEventByCategory);
router.get('/edit/:id',editEvent)
router.get('/details',editEvent)
router.get('/delete/',deleteEvent)
router.post('/update/:id',upload.single("image"), updateEvent)

module.exports = router
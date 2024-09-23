const express = require('express');
const {
   getEvent, createEvent, editEvent, deleteEvent, updateEvent,findEventByTitle, findEventByCategory} = require('../controller/eventController');
const router = express.Router();
const upload = require('../config/multer-config');
const { isUserLoggedIn } = require('../middlewares/isLoggedIn');

// Retrieve events
router.get('/', getEvent);
// Find events by title and category 
router.get('/find/title', findEventByTitle);
router.get('/find/category', findEventByCategory);

// Create, update, and delete events
router.post('/create', isUserLoggedIn, createEvent);
router.post('/update/:id', upload.single("image"), isUserLoggedIn, updateEvent);
router.delete('/delete/:id', isUserLoggedIn, deleteEvent);

// Edit event
router.get('/edit/:id', isUserLoggedIn, editEvent);
router.get('/details', editEvent); 

module.exports = router;

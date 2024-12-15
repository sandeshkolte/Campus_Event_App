const express = require('express');
const {
   getEvent, createEvent, editEvent, deleteEvent, updateEvent,findEventByTitle, findEventByCategory,
   eventDetails,
   addParticipantandEvent,
   addGroupParticipants,
   updateGroupPaymentStatus,
   activeEvents,
   updateStudentPaymentStatus,
   adminAllEvents} = require('../controller/eventController');
const router = express.Router();
const upload = require('../config/multer-config');
const { isUserLoggedIn, isAdminLoggedIn } = require('../middlewares/isLoggedIn');

// Retrieve events
router.get('/', getEvent);
router.get('/details', eventDetails); 
router.get('/active-events/:userId', activeEvents);
router.get('/myallevents/:userId', adminAllEvents);

// Find events by title and category 
router.get('/find/title', findEventByTitle);
router.get('/find/category', findEventByCategory);

// Create, update, and delete events
router.post('/create',  createEvent);
router.post('/update/:id', updateEvent);
router.delete('/delete/:id',  deleteEvent);

// Edit event
router.get('/edit/:id',  editEvent);
router.post('/add-participants', addParticipantandEvent);
router.post('/add-group-participants', addGroupParticipants);
router.post('/update-group-payment-status', updateGroupPaymentStatus);
router.post('/update-payment-status', updateStudentPaymentStatus);


module.exports = router;

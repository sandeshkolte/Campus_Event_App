const express = require('express');
const router = express.Router();
const winnersController = require('../controller/winnerController');

// Routes
// Add or update winners for a specific event
router.post('/add/:eventId', winnersController.addWinner);

// Get all winners
router.get('/', winnersController.getWinners);

router.post('/toggle/:eventId', winnersController.winnerShowToggle);

// Get winners for a specific event
router.get('/:eventId', winnersController.getWinnersByEvent);

// Delete a winner entry by ID
router.delete('/:id', winnersController.deleteWinner);

module.exports = router;

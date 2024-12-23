const Winner = require('../models/winner');
const eventId = require('../models/event'); // Assuming eventId is the eventId model

// Add a new winner
exports.addWinner = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { winners, showWinners } = req.body; // `winners` is an array of { user, position }
console.log("winners:",winners);
console.log("eventId:",eventId);

    // Check if the eventId exists
    const existingEvent = await eventId.findById(eventId);
    if (!existingEvent) {
      return res.status(404).json({ message: 'eventId not found' });
    }

    // Check if a winner entry for the eventId already exists
    let winnerEntry = await Winner.findOne({ eventId });
    if (!winnerEntry) {
      // Create a new winner entry
      winnerEntry = new Winner({ eventId, winners: winners || [], visibility: showWinners });
      await winnerEntry.save();
    } else {
      // If the winner entry exists, check if there are winners
      if (!winners || winners.length === 0) {
        return res.status(400).json({ message: 'No winners provided to update' });
      }

      // Update existing winner entry
      winnerEntry.winners = winners || winnerEntry.winners;
      if (showWinners !== undefined) {
        winnerEntry.visibility = showWinners;
      }
      await winnerEntry.save();
    }

    // Update the eventId's winner field with the winner document's ID
    existingEvent.winner = winnerEntry._id;
    await existingEvent.save();

    // Populate user details in winners
    const updatedWinnerEntry = await Winner.findOne({ eventId })
      .populate('winners.user', 'fullname email branch yearOfStudy')
      .populate('eventId', 'title description');

    res.status(200).json({ message: 'Winners updated successfully', winner: updatedWinnerEntry });
  } catch (error) {
    console.log("Error: ",error);
    
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get all winners
exports.getWinners = async (req, res) => {
  try {
let winners  = await Winner.find() 
if (winners.length === 0  || !winners) {
    return res.status(404).json({ message: 'No winners found' });
  }

else if(winners){
    winners = await Winner.find({ showWinners: true }) // Filter by showWinners
     .populate('winners.user', 'firstname lastname email branch yearOfStudy') // Populate user details
     .populate('eventId', 'title description'); // Populate eventId details
     res.status(200).json(winners);
}

  } catch (error) {
    res.status(500).json({ message: 'Error fetching winners', error });
    console.log("Error: ",error);
    
  }
};

// Toggle visibility of winners
exports.winnerShowToggle = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { showWinners } = req.body;

// console.log("showWinners:",showWinners);
// console.log("event:",eventId);

    // Find the event by ID
    const winner = await Winner.findOne({eventId});
    if (!winner) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (showWinners !== undefined) {
        winner.showWinners = showWinners;
        await winner.save();
    }

    res.status(200).json({ message: `Winners show ${showWinners}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    console.log("Error: ",error);
  }
};

// Get winners for a specific eventId
exports.getWinnersByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const winnerEntry = await Winner.findOne({ eventId })
      .populate('winners.user', 'fullname email branch yearOfStudy')
      .populate('eventId', 'title description');

    if (!winnerEntry) {
      return res.status(404).json({ message: 'No winners found for this eventId' });
    }

    res.status(200).json(winnerEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching winners for the eventId', error });
  }
};

// Delete a winner entry for an eventId
exports.deleteWinner = async (req, res) => {
  try {
    const { id } = req.params; // Winner entry ID
    const winner = await Winner.findByIdAndDelete(id);
    if (!winner) {
      return res.status(404).json({ message: 'Winner entry not found' });
    }
    res.status(200).json({ message: 'Winner entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting winner entry', error });
  }
};

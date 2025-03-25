const Winner = require("../models/winner");
const EventModel = require("../models/event");
const { Knock } = require("@knocklabs/node");

const knock = new Knock(process.env.KNOCK_API_KEY);

// Add winners
exports.addWinner = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { winners, showWinners } = req.body; // winners array [{ user, position }]
    
console.log("winners:", winners);


    const existingEvent = await EventModel.findById(eventId);
    if (!existingEvent) return res.status(404).json({ message: "Event not found" });

    let winnerEntry = await Winner.findOne({ eventId });
    if (!winnerEntry) {
      winnerEntry = new Winner({ eventId, winners, showWinners: showWinners });
    } else {
      if (!winners || winners.length === 0) return res.status(400).json({ message: "No winners provided" });

      winnerEntry.winners = winners;
      if (showWinners !== undefined) winnerEntry.showWinners = showWinners;
    }
    await winnerEntry.save();

    // Update event model with the winner ID
    existingEvent.winner = winnerEntry._id;
    await existingEvent.save();

    // Send notifications
    // if (existingEvent.participants.length > 0) {
    //   await knock.workflows.trigger("winners-announcement", {
    //     recipients: existingEvent.participants,
    //     data: {
    //       title: `🎉 Winners Announced for ${existingEvent.title}!`,
    //       message: `Check out the winners for "${existingEvent.title}"!`,
    //     },
    //   });
    // }

    const updatedWinnerEntry = await Winner.findOne({ eventId })
      .populate("winners.user", "firstname lastname email branch yearOfStudy")
      .populate("eventId", "title description");

    res.status(200).json({ message: "Winners updated successfully", winner: updatedWinnerEntry });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all winners
exports.getWinners = async (req, res) => {
  try {
    const winners = await Winner.find({ showWinners: true })
      .populate("winners.user", "firstname lastname email branch yearOfStudy")
      .populate("eventId", "title description");

    if (!winners.length) return res.status(404).json({ message: "No winners found" });

    res.status(200).json(winners);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching winners", error });
  }
};

// Toggle visibility of winners
exports.winnerShowToggle = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { showWinners } = req.body;

    const winner = await Winner.findOne({ eventId });
    if (!winner) return res.status(404).json({ message: "Winner entry not found" });

    winner.showWinners = showWinners;
    await winner.save();

    res.status(200).json({ message: `Winners visibility updated to ${showWinners}` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get winners by event ID
exports.getWinnersByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const winnerEntry = await Winner.findOne({ eventId })
      .populate("winners.user", "firstname lastname email branch yearOfStudy")
      .populate("eventId", "title description");

    if (!winnerEntry) return res.status(404).json({ message: "No winners found for this event" });

    res.status(200).json(winnerEntry);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching winners", error });
  }
};

// Delete a winner entry
exports.deleteWinner = async (req, res) => {
  try {
    const { id } = req.params;
    const winner = await Winner.findByIdAndDelete(id);
    if (!winner) return res.status(404).json({ message: "Winner entry not found" });

    res.status(200).json({ message: "Winner entry deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error deleting winner entry", error });
  }
};

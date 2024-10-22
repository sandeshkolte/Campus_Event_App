const eventModel = require('../models/event');
const user = require('../models/user');
const userModel = require('../models/user');
const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDISHOST,
    port: 11327,
    password: process.env.REDISPASS,
});

//create event working fine on postman
const createEvent = async (req, res) => {
    try {
      let {
        title,
        description,
        image,
        organisedBy,
        organizingBranch,
        category,
        coordinator,
        price,
        participants,
        startDate,
        endDate,
        qrImage,
        venue,
      } = req.body;
  
     await eventModel.create({
        title,
        description,
        image,
        organisedBy, // Convert to ObjectId
        organizingBranch,
        category,
        coordinator, // Convert array to ObjectIds
        price,
        participants, // Optional participants field
        startDate,
        endDate,
        qrImage,
        venue,
      });
      res.status(201).json({
        status:"success",
        response:"Event Created Successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create event", error: error.message });
    }
  };
  
  // Get all events
//   const getAllEvents = async (req, res) => {
//     try {
//       const events = await Event.find().populate("organisedBy coordinator participants", "username fullname"); // Populate related fields
//       res.status(200).json(events);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to retrieve events", error: error.message });
//     }
//   };
  
  // Get an event by ID
//   const getEventById = async (req, res) => {
//     try {
//       const event = await Event.findById(req.params.id).populate("organisedBy coordinator participants", "username fullname");
//       if (!event) {
//         return res.status(404).json({ message: "Event not found" });
//       }
//       res.status(200).json(event);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to retrieve event", error: error.message });
//     }
//   };
  
  // Update an event
  const updateEvent = async (req, res) => {
    try {

      let {
        title,
        description,
        image,
        organisedBy,
        organizingBranch,
        category,
        coordinator,
        price,
        participants,
        startDate,
        endDate,
        qrImage,
        venue,
      } = req.body;

      const updatedEvent = await eventModel.findByIdAndUpdate(
        req.params.id,
        {
            title,
            description,
            image,
            organisedBy, // Convert to ObjectId
            organizingBranch,
            category,
            coordinator, // Convert array to ObjectIds
            price,
            participants, // Optional participants field
            startDate,
            endDate,
            qrImage,
            venue,
          },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update event", error: error.message });
    }
  };
  
  // Delete an event
//   const deleteEvent = async (req, res) => {
//     try {
//       const deletedEvent = await Event.findByIdAndDelete(req.params.id);
  
//       if (!deletedEvent) {
//         return res.status(404).json({ message: "Event not found" });
//       }
  
//       res.status(200).json({ message: "Event deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to delete event", error: error.message });
//     }
//   };
  

const getEvent = async (req, res, next) => {
    try {
        let events = await redis.get("events");
        if (events) {
            console.log("Get from cache");
            return res.json({ response: JSON.parse(events) });
        }
        console.log("From MONGO");
        events = await eventModel.find().populate('organisedBy coordinator participants');
        await redis.setex("events", 60, JSON.stringify(events));

        res.status(200).json({ status: "success", response: events });
    } catch (err) {
        next(err);
    }
};

const findEventByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const event = await eventModel.find({ category: { $regex: category, $options: "i" } });
        res.status(200).json({ status: "success", response: event });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};

const findEventByTitle = async (req, res) => {
    try {
        const { search } = req.params;
        const event = await eventModel.find({ title: search });
        res.status(200).json({ status: "success", response: event });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};

// const createEvent = async (req, res) => {
//     try {
//         let {
//             title, description, image, organizingBranch, organisedBy, category, coordinator, price, participants, date, venue
//         } = req.body;

//         console.log("Request Body:", req.body);

//         let event = new eventModel({
//             title,
//             description,
//             image,
//             organizingBranch,
//             category,
//             coordinator,
//             price,
//             participants,
//             date,
//             venue,
//             organisedBy  // Assuming the organiser is the logged-in user
//         });

//         await event.save();
//         res.status(201).json({
//             status: "success",
//             response: "Event Created Successfully"
//         });
//     } catch (err) {
//         res.status(403).json({ status: "Error", response: err.message });
//     }
// };

const editEvent = async (req, res) => {
    try {
        const { id } = req.query;
        let event = await eventModel.findById(id).populate('organisedBy coordinator participants');
        res.status(200).json({
            event
        });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};

const eventDetails = async (req, res) => {
    try {
        const { id } = req.query;
        let event = await eventModel.findById(id)
        res.status(200).json({
            event
        });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        console.log(req.query.id);
        let event = await eventModel.findOneAndDelete({ _id: req.query.id });
        res.status(200).json({
            status: "success",
            response: `Event deleted`
        });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
    }
};

// const updateEvent = async (req, res) => {
//     try {
//         let { title, description, image, organizingBranch, category, coordinator, price, participants, date, venue } = req.body;

//         let updatedEvent = await eventModel.findOneAndUpdate(
//             { _id: req.params.id },
//             { title, description, image, organizingBranch, category, coordinator, price, participants, date, venue },
//             { new: true }
//         );

//         res.status(200).json({
//             status: "success",
//             response: "Event Updated"
//         });
//     } catch (err) {
//         res.status(403).json({ status: "Error", response: err.message });
//     }
// };

const addParticipantandEvent = async (req, res) => {

    // User added as event participant and event added to user event

    const {userId, eventId, paymentImage } = req.body;
    console.log(req.body);
    try {
      const userUpdate = await userModel.findByIdAndUpdate(userId, {
        $push: { myevents: { eventId, paymentScreenshot: paymentImage } },
      }, { new: true }); // `new: true` returns the updated document
  
      if (!userUpdate) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const eventUpdate = await eventModel.findByIdAndUpdate(eventId, {
        $push: { participants: {userId} },
      }, { new: true });
  
      if (!eventUpdate) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "User added as event participant and event added to user event" });
  } catch (err) {
      console.error("Error during user/event update:", err.message);
      res.status(500).json({ status: "Error", response: err.message });
  }
  
};

const addGroupParticipants = async (req, res) => {
  try {
      const { eventId, groupName, participants, paymentImage } = req.body;
      
      const event = await eventModel.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      if (!event.isGroupEvent) {
          return res.status(400).json({ message: "This event is not marked as a group event" });
      }

      // Adding participants to the event with the same groupName
      participants.forEach(async (participantId) => {
          event.participants.push({ userId: participantId, groupName });
          
          // Optionally update each user's myevents to reflect the group registration
          await userModel.findByIdAndUpdate(participantId, {
              $push: {
                  myevents: {
                      eventId: eventId,
                      paymentStatus: 'pending',
                      paymentScreenshot: paymentImage
                  }
              }
          });
      });

      await event.save();
      res.status(200).json({ message: "Group participants added successfully", event });

  } catch (error) {
      res.status(500).json({ message: "Error adding group participants", error });
  }
};

const updateGroupPaymentStatus = async (req, res) => {
  try {
    const { eventId, groupName, userId, newStatus } = req.body;

    console.log(req.body);

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check authorization (either organiser or coordinator)
    const isAuthorized = event.organisedBy.equals(userId) || event.coordinator.some(coordinatorId => coordinatorId.equals(userId));
    if (!isAuthorized) {
      return res.status(403).json({ message: 'You are not authorized to update payment status for this event.' });
    }

    // Filter participants based on the group name
    const groupParticipants = event.participants.filter(p => p.groupName === groupName);
    if (groupParticipants.length === 0) {
      return res.status(404).json({ message: 'No participants found for this Group Name.' });
    }

    // Update payment status for each participant in the group
    const updatePromises = groupParticipants.map(participant => {
      return userModel.findOneAndUpdate(
        { _id: participant._id, "myevents.eventId": eventId },
        { $set: { "myevents.$.paymentStatus": newStatus } } // Use the $ positional operator to update the correct entry in the array
      );
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    res.status(200).json({ message: "Payment status updated for all group members", group: groupParticipants });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating payment status", error });
  }
};


const updateStudentPaymentStatus = async (req, res) => {
  try {
    const { eventId, participantId, newStatus, userId } = req.body;
    
    // console.log(req.body);
    // Find the event by ID
    const event = await eventModel.findById(eventId);
    
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user making the request is the event organizer or one of the coordinators
    const isAuthorized = event.organisedBy.equals(userId) || event.coordinator.some(coordinatorId => coordinatorId.equals(userId));
    
    if (!isAuthorized) {
        return res.status(403).json({ message: 'You are not authorized to update payment status for this event.' });
    }

    // Find the participant in the event by participantId
    const participant = event.participants.find(p => p.userId.equals(participantId));
    
    if (!participant) {
        return res.status(404).json({ message: 'Participant not found in this event.' });
    }

    // Assuming myevents is a field in the User model that stores the events the participant is involved in.
    // Find the specific event in the participant's myevents
    const user = await userModel.findById(participantId);

    const participantEvent = user.myevents.find(e => e.eventId.equals(eventId));
    
    if (!participantEvent) {
        return res.status(404).json({ message: 'Event not found in participant\'s myevents.' });
    }

    // Update the payment status for this specific event
    participantEvent.paymentStatus = newStatus;

    // Save the user's updated myevents
    await user.save();

    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Server error', error });
  }
};

const activeEvents = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all active events
    const events = await eventModel.find({ isActive: true });

    // Filter events where the user is either the organiser or a coordinator
    const adminEvents = events.filter(event => 
      event.organisedBy.equals(userId) || 
      event.coordinator.some(coordinatorId => coordinatorId.equals(userId))
    );

    console.log(adminEvents);

    // Check if any admin events were found
    if (adminEvents.length === 0) {
      return res.status(404).json({ message: 'The user is not admin of any event.' });
    }

    res.status(200).json({ adminEvents });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};



module.exports = {
    getEvent,
    findEventByCategory,
    findEventByTitle,
    updateEvent,
    deleteEvent,
    createEvent,
    editEvent,
    eventDetails,
    addParticipantandEvent,
    addGroupParticipants,
    updateGroupPaymentStatus,
    activeEvents,
    updateStudentPaymentStatus
};

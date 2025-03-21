const eventModel = require('../models/event');
const userModel = require('../models/user');
const Redis = require('ioredis');
require('dotenv').config();
const { Knock }  = require("@knocklabs/node")
const knock = new Knock(process.env.KNOCK_API_KEY);
const { format } =  require('date-fns');

const redis = new Redis({
    host: process.env.REDISHOST,
    port: 12853,
    password: process.env.REDISPASS,
});

//create event working fine on postman
const createEvent = async (req, res) => {

    try {
      let {
        title,
        description,
        image,
        organizingBranch,
        organisedBy,
        isAuditCourse,
        isGroupEvent,
        participantSize,
        category,
        coordinator,
        price,
        participants,
        startDate,
        endDate,
        qrImage,
        venue,
      } = req.body;

   const newEvent = await eventModel.create({
      title,
      description,
      image,
      organizingBranch,
      isAuditCourse,
      organisedBy,
      isGroupEvent,
      participantSize,
      category,
      coordinator,
      price,
      participants,
      startDate,
      endDate,
      qrImage,
      venue,
      });

      const users = await userModel.find(); 
      const userIds = users.map((user) => user._id.toString()); 

      await knock.workflows.trigger('new-event-notification', {
        recipients: userIds,
        data: {
          eventTitle: newEvent.title,
          eventDate: format(newEvent.startDate, 'dd MMMM yyyy'),
        },
      });

      // await knock.workflows.trigger("event-created", {
      //   recipients: ["all"], // Assuming "all" is a valid recipient group in your Knock setup
      //   data: {
      //     eventName: newEvent.name,
      //     eventDate: newEvent.date,
      //     eventVenue: newEvent.venue,
      //     eventDescription: newEvent.description,
      //   },
      // });

      res.status(201).json({
        status:"success",
        response:"Event Created Successfully"
      });
    } catch (error) {
      console.log(error);
      
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
        organizingBranch,
        isAuditCourse,
        isGroupEvent,
        participantSize,
        category,
        isActive,
        coordinator,
        price,
        participants,
        startDate,
        endDate,
        qrImage,
        venue,
      } = req.body;

      const { id } = req.params;

      console.log(req.body); // Debugging req.body
      console.log(req.params); // Debugging req.params      

      const updatedEvent = await eventModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
          isActive,
          organizingBranch,
          isAuditCourse,
          isGroupEvent,
          participantSize,
          category,
          coordinator,
          price,
          participants,
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
  
      // await knock.workflows.trigger("event-updated", {
      //   recipients: ["all"], // Assuming "all" is a valid recipient group in your Knock setup
      //   data: {
      //     eventName: updatedEvent.name,
      //     eventDate: updatedEvent.date,
      //     eventVenue: updatedEvent.venue,
      //     eventDescription: updatedEvent.description,
      //   },
      // });

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
            // console.log("Get from cache");
            return res.json({ response: JSON.parse(events) });
        }
        // console.log("From MONGO");

        // the populate used here makes the id as na object os that i get all info just from the id
        events = await eventModel.find({isActive:true}).populate('organisedBy coordinator participants winner.user');
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

const findRelatedEvents = async (req, res) => {
  try {
      const { branch, organiserId } = req.query; // Accept branch and organiserId as query parameters

      // Build a dynamic query object
      const query = {};
      if (branch) query.organizingBranch = branch;
      if (organiserId) query.organisedBy = organiserId;

      // Fetch events based on the query
      const events = await eventModel.find(query);

      res.status(200).json({ status: "success", response: events });
  } catch (err) {
      res.status(403).json({ status: "Error", response: err.message });
  }
};

const findEventByBranch = async (req, res) => {
  try {
      const { organizingBranch } = req.query; // Accept branch as query parameter
      // Fetch events based on the query

      console.log("Organizing Branch:", organizingBranch);
      const events = await eventModel.find({organizingBranch, isActive: true});

      res.status(200).json({ status: "success", response: events });
  } catch (err) {
      res.status(403).json({ status: "Error", response: err.message });
  }
};


const updateWinners = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { showWinners } = req.body; // winners is an array of { user, position }

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (showWinners !== undefined) {
      event.showWinners = showWinners;
    }

    await event.save();

    res.status(200).json({ message: "Winners updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
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
  const { userId, eventId, paymentImage } = req.body;

  try {
      // Check if the user is already a participant in the event
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const alreadyRegistered = user.myevents.some(event => event.eventId.toString() === eventId);
      if (alreadyRegistered) {
          return res.status(400).json({ message: "User is already registered for this event" });
      }

      // Add the user to the event
      const userUpdate = await userModel.findByIdAndUpdate(
          userId,
          { $push: { myevents: { eventId, paymentScreenshot: paymentImage } } },
          { new: true }
      );

      const eventUpdate = await eventModel.findByIdAndUpdate(
          eventId,
          { $push: { participants: { userId } } },
          { new: true }
      );

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

      // Fetch all participants from the database
      const users = await userModel.find({ _id: { $in: participants } });

      // Filter out already registered participants
      const newParticipants = users.filter(user => 
          !user.myevents.some(event => event.eventId.toString() === eventId)
      );

      if (newParticipants.length === 0) {
          return res.status(400).json({ message: "All users in the group are already registered" });
      }

      // Update only new participants
      const participantUpdates = newParticipants.map(user => ({
          updateOne: {
              filter: { _id: user._id },
              update: {
                  $push: { myevents: { eventId, paymentScreenshot: paymentImage } }
              }
          }
      }));

      await userModel.bulkWrite(participantUpdates);

      // Add new participants to the event
      event.participants.push(...newParticipants.map(user => ({ userId: user._id, groupName })));
      await event.save();

      res.status(200).json({ message: "New group participants added successfully", event });
  } catch (error) {
      console.error("Error adding group participants:", error);
      res.status(500).json({ message: "Error adding group participants", error });
  }
};

const updateGroupPaymentStatus = async (req, res) => {
  try {
    const { eventId, groupName, userId, newStatus } = req.body;

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check authorization
    const isAuthorized = event.organisedBy.equals(userId) || event.coordinator.some(coordinatorId => coordinatorId.equals(userId));
    if (!isAuthorized) {
      return res.status(403).json({ message: 'You are not authorized to update payment status for this event.' });
    }

    // Filter participants based on the group name
    const groupParticipants = event.participants.filter(p => p.groupName === groupName);
    if (groupParticipants.length === 0) {
      return res.status(404).json({ message: 'No participants found for this Group Name.' });
    }

    // Update payment status in both User and Event models
    const updatePromises = groupParticipants.map(async (participant) => {
      // Update User model
      await userModel.findOneAndUpdate(
        { _id: participant.userId, "myevents.eventId": eventId },
        { $set: { "myevents.$.paymentStatus": newStatus } }
      );

      // Update Event model
      await eventModel.updateOne(
        { _id: eventId, "participants.userId": participant.userId },
        { $set: { "participants.$.paymentStatus": newStatus } }
      );
    });

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

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check authorization
    const isAuthorized = event.organisedBy.equals(userId) || event.coordinator.some(coordinatorId => coordinatorId.equals(userId));
    if (!isAuthorized) {
      return res.status(403).json({ message: 'You are not authorized to update payment status for this event.' });
    }

    // Find the participant in the event
    const participant = event.participants.find(p => p.userId.equals(participantId));
    if (!participant) return res.status(404).json({ message: 'Participant not found in this event.' });

    // Update User model
    const user = await userModel.findById(participantId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const participantEvent = user.myevents.find(e => e.eventId.equals(eventId));
    if (!participantEvent) return res.status(404).json({ message: 'Event not found in participant\'s myevents.' });

    participantEvent.paymentStatus = newStatus;
    await user.save();

    // Update Event model
    await eventModel.updateOne(
      { _id: eventId, "participants.userId": participantId },
      { $set: { "participants.$.paymentStatus": newStatus } }
    );

    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const activeEvents = async (req, res) => {
  try {
    const { userId } = req.params; // Access userId from req.params
    // console.log(req.params);

    // Find all active events
    const events = await eventModel.find({ isActive: true });

    // Filter events where the user is either the organiser or a coordinator
    const adminEvents = events.filter(event => 
      String(event.organisedBy) === String(userId) || 
      event.coordinator.some(coordinatorId => String(coordinatorId) === String(userId))
    );

    // console.log(adminEvents);

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


const adminAllEvents = async (req, res) => {
  try {
    const { userId } = req.params; // Access userId from req.params
    // console.log(req.params);

    // Find all active events
    const events = await eventModel.find();

    // Filter events where the user is either the organiser or a coordinator
    const adminEvents = events.filter(event => 
      String(event.organisedBy) === String(userId) || 
      event.coordinator.some(coordinatorId => String(coordinatorId) === String(userId))
    );

    // console.log(adminEvents);

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

//  Save or update the certificate template for an event
const saveCertificateTemplate = async (req, res) => {
  try {
    const { eventId, backgroundImage, fields } = req.body;

console.log("Request Body:", req.body);

    // Validate input data
    if (!eventId || !backgroundImage || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Find event by ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Update event with certificate template
    event.certificateTemplate = {eventId:event._id, backgroundImage, fields };
    event.isCertificateEnabled = true;

    await event.save();

    return res.status(200).json({
      message: "Certificate template saved successfully.",
      certificateTemplate: event.certificateTemplate,
    });
  } catch (error) {
    console.error("Error saving certificate template:", error);
    return res.status(500).json({ message: "Server error." });
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
    adminAllEvents,
    updateStudentPaymentStatus,
    findRelatedEvents,
    updateWinners,
    findEventByBranch,
    saveCertificateTemplate
};

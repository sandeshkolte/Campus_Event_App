const eventModel = require('../models/event');
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
  
      eventModel.create({
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
        await userModel.findByIdAndUpdate(userId, { $push: { myevents: {eventId:eventId, paymentScreenshot:paymentImage} } });
        await eventModel.findByIdAndUpdate(eventId, { $push: { participants: userId } });
        res.status(200).json({ message: "User added as event participant and event added to user event" });
    } catch (err) {
        res.status(403).json({ status: "Error", response: err.message });
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
    addParticipantandEvent
};

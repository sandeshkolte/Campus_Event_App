const eventModel = require('../models/event');
const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDISHOST,
    port: 11327,
    password: process.env.REDISPASS,
});

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
        res.status(400).json({ status: "Error", response: err.message });
    }
};

const findEventByTitle = async (req, res) => {
    try {
        const { search } = req.params;
        const event = await eventModel.find({ title: search });
        res.status(200).json({ status: "success", response: event });
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
    }
};

const createEvent = async (req, res) => {
    try {
        let {
            title, description, image, organisingBranch, category, coordinator, price, participants, date, venue
        } = req.body;

        console.log("Request Body:", req.body);

        let event = new eventModel({
            title,
            description,
            image,
            organizingBranch: req.user.branch,
            category,
            coordinator,
            price,
            participants,
            date,
            venue,
            organisedBy: req.user._id  // Assuming the organiser is the logged-in user
        });

        await event.save();
        res.status(201).json({
            status: "success",
            response: "Event Created Successfully"
        });
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
    }
};

const editEvent = async (req, res) => {
    try {
        const { id } = req.query;
        let event = await eventModel.findById(id).populate('organisedBy coordinator participants');
        res.status(200).json({
            event
        });
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
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
        res.status(400).json({ status: "Error", response: err.message });
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
        res.status(400).json({ status: "Error", response: err.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        let { title, description, image, organizingBranch, category, coordinator, price, participants, date, venue } = req.body;

        let updatedEvent = await eventModel.findOneAndUpdate(
            { _id: req.params.id },
            { title, description, image, organizingBranch, category, coordinator, price, participants, date, venue },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            response: "Event Updated"
        });
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
    }
};

const addParticipants = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        await eventModel.findByIdAndUpdate(eventId, { $push: { participants: userId } });
        res.status(200).json({ message: "User added as event participant" });
    } catch (err) {
        res.status(400).json({ status: "Error", response: err.message });
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
    addParticipants
};

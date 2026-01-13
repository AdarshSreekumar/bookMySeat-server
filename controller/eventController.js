const mongoose = require("mongoose");
const events=require('../model/eventModel')



// Inside your addEvent controller
exports.addEvent = async (req, res) => {
    // Change 'title' to 'name' to match your model!
    const { name, auditorium, date, time, userId } = req.body; 
    const creatorId = req.payload; 

    try {
        const newEvent = new events({
            name,        // Matches your Schema
            auditorium,  // Matches your Schema
            date,
            time,
            status: "pending",
            userId: creatorId 
        });
        await newEvent.save();
        res.status(200).json(newEvent);
    } catch (err) {
        res.status(401).json(err);
    }
};

// 2. Coordinator sees their own events only
exports.getCoordinatorEvents = async (req, res) => {
    const userId = req.payload; 
    try {
        const allCoordinatorEvents = await events.find({ userId });
        res.status(200).json(allCoordinatorEvents);
    } catch (err) {
        res.status(401).json(err);
    }
};

// 3. Admin approves an event
exports.approveEvent = async (req, res) => {
    const { id } = req.params; 
    try {
        const approvedEvent = await events.findByIdAndUpdate(
            { _id: id },
            { status: "approved" },
            { new: true } 
        );
        res.status(200).json(approvedEvent);
    } catch (err) {
        res.status(401).json({ message: "Approval failed", error: err });
    }
};

// allevents
// This function should fetch ALL events for the Admin
exports.getAllEvents = async (req, res) => {
    try {
        const allEvents = await events.find(); // No filter, so Admin sees everything
        res.status(200).json(allEvents);
    } catch (err) {
        res.status(401).json(err);
    }
};

// all approved events
exports.getHomeEvents = async (req, res) => {
    try {
        // Only fetch events where status is approved
        const approvedEvents = await events.find({ status: 'approved' });
        res.status(200).json(approvedEvents);
    } catch (err) {
        res.status(500).json(err);
    }
};
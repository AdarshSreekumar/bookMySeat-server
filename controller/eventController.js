const mongoose = require("mongoose");
const events=require('../model/eventModel')



// Inside your addEvent controller
exports.addEvent = async (req, res) => {
    console.log("Inside addEvent Function");

    // 1. Get text data from req.body
    const { name, auditorium, date, time } = req.body;
    
    // 2. Get image filename from req.file (provided by Multer)
    const eventImg = req.file ? req.file.filename : null;
    
    // 3. Get userId from jwtMiddleware (req.payload)
    const userId = req.payload;

    // Validation: Ensure all fields including image are present
    if (!name || !auditorium || !date || !time || !eventImg || !userId) {
        return res.status(406).json("Please fill the form completely and upload an image");
    }

    try {
        // Check if the same event already exists (optional check)
        const existingEvent = await events.findOne({ name, date, auditorium });

        if (existingEvent) {
            res.status(406).json("This event is already scheduled at this time/place");
        } else {
            // 4. Create new event object with image
            const newEvent = new events({
                name, 
                auditorium, 
                date, 
                time, 
                eventImg, 
                userId, 
                status: "pending" // Initial status
            });

            // 5. Save to MongoDB
            await newEvent.save();
            res.status(200).json(newEvent);
        }
    } catch (err) {
        res.status(401).json(`Error: ${err}`);
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

// delete an event
// Delete an event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const removeEvent = await events.findByIdAndDelete({ _id: id });
        res.status(200).json(removeEvent);
    } catch (err) {
        res.status(401).json(err);
    }
};
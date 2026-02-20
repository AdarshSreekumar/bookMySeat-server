const mongoose = require("mongoose");
const seats = require("../model/seatModel");
const book = require('../model/bookModel');
const users = require('../model/userModel');
const events=require('../model/eventModel')

exports.getOccupiedSeats = async (req, res) => {
    const { eventId } = req.params; 
    try {
        // Change 'bookings.find' to 'book.find' (or whatever your import name is)
        const allBookings = await book.find({ eventId });

        // Extract all seat IDs from those bookings
        const bookedSeatIds = allBookings.flatMap(b => b.seats);

        res.status(200).json(bookedSeatIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch seats" });
    }
};

exports.getAllBookingsController = async (req, res) => {
    try {
        // Fetch all bookings and populate user/event details if they are references
        const allBookings = await book.find().sort({ createdAt: -1 });
        res.status(200).json(allBookings);
    } catch (err) {
        res.status(500).json({ message: "Request failed", error: err });
    }
};


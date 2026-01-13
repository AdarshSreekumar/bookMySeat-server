const mongoose = require("mongoose");
const seats = require("../model/seatModel");
const book = require('../model/bookModel');
const users = require('../model/userModel');
const events=require('../model/eventModel')


// fetch seats for event
exports.getAllSeats=async(req,res)=>{
  try {
    const seatData=await seats.find()
    res.status(200).json(seatData)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
    
  }
}

// book seat
exports.bookSeats = async (req, res) => {
    const { eventId, seats: seatIds } = req.body; // Remove totalAmount from destructuring here
    const userId = req.payload;

    try {
        // 1. Fetch the actual seat records from the DB to get the latest prices
        const seatRecords = await seats.find({ _id: { $in: seatIds } });
        
        // 2. Calculate the total server-side
        const totalAmount = seatRecords.reduce((sum, s) => sum + s.price, 0);

        // 3. Save the booking with the FRESHly calculated total
        const newBooking = new book({
            userId, 
            eventId,
            seats: seatIds,
            totalAmount, // This is now the updated price from the DB
            status: "booked"
        });

        await newBooking.save();
        res.status(200).json(newBooking);
    } catch (err) {
        res.status(500).json("Server Error");
    }
};

// booked seats

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.payload; 
        
        // ADD .populate('seats') HERE
        // This tells Mongoose: "Don't just give me the Seat ID, give me the whole Seat Object"
        const allBookings = await book.find({ userId })
            .populate('eventId')
            .populate('seats'); 

        res.status(200).json(allBookings);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllSeatsForEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        // 1. Get all physical seats in the auditorium
        const allSeats = await seats.find(); 

        // 2. Get all bookings ALREADY made for THIS specific event
        const bookedForThisEvent = await bookings.find({ eventId });

        // 3. Extract just the seat IDs/Numbers that are taken
        const occupiedSeatIds = bookedForThisEvent.flatMap(b => b.seats);

        // 4. Map through allSeats and dynamically set 'isBooked'
        const dynamicSeats = allSeats.map(seat => ({
            ...seat._doc,
            isBooked: occupiedSeatIds.includes(seat.seatNumber) 
        }));

        res.status(200).json(dynamicSeats);
    } catch (err) {
        res.status(500).json(err);
    }
};
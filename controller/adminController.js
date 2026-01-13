const users=require('../model/userModel')
const book=require('../model/bookModel')
const seats=require('../model/seatModel')
const events=require('../model/eventModel')

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find().select('-password'); // Don't send passwords!
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await users.findByIdAndDelete(id);
        res.status(200).json("User Deleted");
    } catch (err) {
        res.status(401).json(err);
    }
};

// Example Backend Controller
// bookingController.js

exports.getAllBookings = async (req, res) => {
    try {
        // 2. USE the 'bookings' variable to query the database
        const allBookings = await book.find()
            .populate('userId', 'username email') 
            .populate('eventId', 'name') 
            .populate('seats', 'seatNumber'); // This pulls "A4" instead of just ID

        res.status(200).json(allBookings);
    } catch (err) {
        console.error("Error in getAllBookingsAdmin:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const bookingData = await book.findById(id);
        if (!bookingData) return res.status(404).json("Booking not found");

        const { seats: bookingSeats, eventId } = bookingData;

        // --- THE FIX ---
        // We try to update the seats using BOTH possible methods to ensure no failure
        await seats.updateMany(
            { 
                $or: [
                    { _id: { $in: bookingSeats } }, // Method 1: By Object ID
                    { seatNumber: { $in: bookingSeats }, eventId: eventId } // Method 2: By Number + Event
                ] 
            }, 
            { $set: { isBooked: false } }
        );

        await book.findByIdAndDelete(id);
        res.status(200).json("Success");

    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).json(err);
    }
};


// exports.getAllEvents = async (req, res) => {
//     try {
//         const allEvents = await events.find();
//         res.status(200).json(allEvents);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch events", message: err.message });
//     }
// };
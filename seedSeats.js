require("dotenv").config();          // load env variables
require("./config/db");              // connect to DB

const seats = require("./model/seatModel");
const events = require("./model/eventModel");

const seedSeats = async () => {
  try {
    // 1. Create the Event
    const newEvent = await events.create({
      name: "Grand Auditorium Opening",
      auditorium: "Main Hall",
      date: new Date(),
      time: "10:00 PM"
    });

    let allSeats = [];

    // 2. Create 10 DIAMOND VIP Seats (Row V)
    for (let i = 1; i <= 10; i++) {
      allSeats.push({
        eventId: newEvent._id,
        seatNumber: `V${i}`,
        row: "V",
        type: "VIP",      // Marked as VIP
        price: 500,        // VIPs are more expensive
        isBooked: false
      });
    }

    // 3. Create GENERAL ADMISSION Seats (Rows A, B, C, D)
    const rows = ["A", "B", "C", "D"];
    rows.forEach((rowName) => {
      for (let i = 1; i <= 12; i++) {
        allSeats.push({
          eventId: newEvent._id,
          seatNumber: `${rowName}${i}`,
          row: rowName,
          type: "Standard", // Marked as Standard
          price: 150,
          isBooked: false
        });
      }
    });

    await seats.insertMany(allSeats);
    console.log("Success! Created 10 VIP and 48 General seats.");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
seedSeats();
const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
     userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true
    },
    seats: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seats" // Referencing the seat document directly
    }
],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked"
    }
}, { timestamps: true })

// create model
const book=mongoose.model("book",bookSchema)


module.exports=book
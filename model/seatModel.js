const mongoose=require('mongoose')

const seatSchema=new mongoose.Schema({
     eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true
    },
    seatNumber: {
      type: String, // A1, A2
      required: true
    },
    row: {
      type: String, // A, B, C
      required: true
    },
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
}, { timestamps: true })

// create model
const seats=mongoose.model("seats",seatSchema)


module.exports=seats
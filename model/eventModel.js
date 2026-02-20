const mongoose=require('mongoose')

const eventSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    auditorium: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    eventImg: {
        type: String,
        required: true
    },
    status: {
    type: String,
    default: "pending", // Default status when a coordinator adds it
    enum: ["pending", "approved", "rejected"]
    },
    userId: {
    type: String,
    required: true
    },
    },
     { timestamps: true }
)

// create model
const events=mongoose.model("events",eventSchema)


module.exports=events
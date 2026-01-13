const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"SeatBooking User"
    },
    role:{
        type:String,
        default:"user",
        enum: ["user", "admin", "coordinator"]
        
    }
}, { timestamps: true })

// create model
const users=mongoose.model("users",userSchema)


module.exports=users
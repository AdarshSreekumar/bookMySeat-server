const mongoose=require('mongoose')
// get connection string from.env file
const connectionString=process.env.ATLASDBCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB connection successfull");
    
}).catch(err=>{
    console.log("database connection failed");
    console.log(err);
    
})
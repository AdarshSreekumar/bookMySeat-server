const users=require('../model/userModel')
// jwt token
const jwt=require('jsonwebtoken')
// register api request
exports.registerController = async (req, res) => {
    console.log("Inside register controller");
    // 1. Add 'role' to the destructuring
    const { username, email, password, role } = req.body;
    console.log(username, email, password, role);

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(409).json("User already exists!! Please login");
        } else {
            // 2. Pass the role to the new user object
            const newUser = new users({
                username, 
                email, 
                password, 
                role: role || "user" // Defaults to "user" if role isn't provided
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
// login
exports.loginController=async(req,res)=>{
    console.log("Inside register controller");
    const {email,password}=req.body
    console.log(email,password);
    try {
        // check mail in model
        const existingUser=await users.findOne({email})
        if (existingUser) {
            if (password==existingUser.password){
                // generate token
                const token = jwt.sign(
                { 
                userId: existingUser._id, // Add this!
                userMail: existingUser.email, 
                role: existingUser.role 
            }, 
    process.env.JWTSECRET
);
                 res.status(200).json({user:existingUser,token})
            }else{
                res.status(401).json("Incorrect Email / Password")
            }
           
        }else{
            res.status(404).json("Account doesn't Exists")
           
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

    // res.status(200).json("request received")
    
}
// google login
exports.googleLoginController=async(req,res)=>{
    console.log("Inside googleLoginController");
    const {username,email,password,picture}=req.body
    console.log(username,email,password,picture);
    try {
        // check mail in model
        const existingUser=await users.findOne({email})
        if (existingUser) {
            if (password==existingUser.password){
                // login
             const token=jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                // register
                res.status(404).json("Account doesn't Exists")
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

    // res.status(200).json("request received")
    
}
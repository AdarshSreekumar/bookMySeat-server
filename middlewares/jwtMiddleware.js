const jwt=require('jsonwebtoken')


const jwtMiddleware = (req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.originalUrl);
    console.log("All Headers:", req.headers);
    if (req.method == "OPTIONS") {
        return next();
    }
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        console.log("Middleware Error: No Header");
        return res.status(401).json("No Header");
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET);
        req.payload = jwtResponse.userId;
        console.log("Middleware Success! User:", jwtResponse.userMail);
        next(); // This is the most important line!
    } catch (err) {
        console.log("JWT Verification Failed:", err.message);
        res.status(401).json("Invalid Token");
    }
};



module.exports=jwtMiddleware
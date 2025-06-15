const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdmin = token === "xyz";
    if(!isAdmin){
        res.status(401).send("unauthorizes request");    
    }
    else{
        next();
    } 
};

const userAuth = async (req, res, next) => {
try {
const { token } = req.cookies;
// Step 1: Check if token exists
if (!token) {
throw new Error("Token is missing. Please login again.");
}
// Step 2: Verify token
const decodedObj = await jwt.verify(token, "DEV@Tinder$790"); // You can replace with
process.env.JWT_SECRET
// Step 3: Extract user ID and find user
const { _id } = decodedObj;
const user = await User.findById(_id);
if (!user) {
throw new Error("User not found in the database.");
}
// Step 4: Attach user info to request for future use
req.user = user;
// Step 5: Proceed to next middleware/controller
next();
} catch (err) {
res.status(401).send("ERROR: " + err.message);
}
}
module.exports ={
    adminAuth,userAuth,
}
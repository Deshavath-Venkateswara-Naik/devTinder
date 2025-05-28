const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");


app.post("/signup",async(req,res)=>{
    const user =new User({
        firstName:"Venkatesh",
        lastName:"Naik",
        emailId:"Venkateshnaik@gmail.com",
        password:"venkatesh@123"
    });
try{
    await user.save();
    res.send("User added Successfully");

}catch(error){
    res.status(400).send("error saving the user:"+err.message);
}
});











connectDB().then(()=>{
    console.log("Databse Connection Established....");
    app.listen(3000, () => {
        console.log("Server is running on port 3000...");
    });
})
.catch((error)=>{
    console.error("Database Connection Failed");

});



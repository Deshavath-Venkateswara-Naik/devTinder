const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User= require("./models/user");
const {validateSignUpData} = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());

app.get("/signup",async(req,res)=>{
    const userEmail =req.body.emailId;
   try{
       const user = await User.findOne({emailId:userEmail});
       res.send(user);
   }catch(error){
       res.status(400).send("error saving the user:"+error.message);
   }
   });
app.post("/signup",async(req,res)=>{
try{
    // validate
    validateSignUpData(req);
    // encryption
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password,10);
    // Saving the user
    const user = await User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });
    await user.save();
    res.send(user);
}catch(error){
    res.status(400).send("error saving the user:"+error.message);
}
});
app.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    const user = await User.findOne({emailId:emailId});
    console.log(user);
    if(!user){
        throw new Error('user not found in DB');
    } 
    const pass = await bcrypt.compare(password,user.password)
    if(!pass){
        throw new Error("password is incorrect");
    }
    if(pass)
    {
        // create jwt 
        const token = await jwt.sign({_id:user._id},"DEV@Tinder$790");
        console.log(token);
        // add the token to the cookies
        res.cookie("token",token,{
            expires:new Date(Date.now()+1000*60*60*24),
            httpOnly:true,
            secure:true,
            sameSite:"none"
        });
        res.send("Login Successfull");
    }
})

app.put("/signup",async(req,res)=>{
    const userEmail =req.body.emailId;
   try{
       const user = await User.findOneAndUpdate({emailId:userEmail},{firstName:"deshavath Venkateswara Naik"},{new:true});
       res.send(user);
   }catch(error){
       res.status(400).send("error saving the user:"+error.message);
   }
});
app.delete("/signup",async(req,res)=>{
    const userEmail =req.body.emailId;
   try{
       const user = await User.findOneAndDelete({emailId:userEmail});
       res.send(user);
   }catch(error){
       res.status(400).send("error saving the user:"+error.message);
   }
});app.get("/profile", async (req, res) => {
    try {
      const cookies = req.cookies; // ✅ Fixed typo: 'cockies' → 'cookies'
      const { token } = cookies;   // ✅ Fixed typo: 'coockies' → 'cookies'
  
      if (!token) {
        throw new Error("Invalid Token");
      }
  
      const decodedMess = await jwt.verify(token, "DEV@Tinder$790");
      const { _id } = decodedMess;
      console.log("id is " + _id);
  
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not Found");
      }
  
      res.send(user);
    } catch (error) {
      res.status(401).json({ error: error.message });
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



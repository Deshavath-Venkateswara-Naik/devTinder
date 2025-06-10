const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User= require("./models/user");
const {validateSignUpData} = require('./utils/validator');
const bcrypt = require('bcrypt');
app.use(express.json());

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
    else
    {
        res.send("user fetched successfully");
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



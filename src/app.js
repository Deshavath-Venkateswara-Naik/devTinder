const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User= require("./models/user");

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
    const user = await User(req.body);
    await user.save();
    res.send(user);
}catch(error){
    res.status(400).send("error saving the user:"+error.message);
}
});

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



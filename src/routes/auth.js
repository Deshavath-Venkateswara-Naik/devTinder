const express = require('express');
const authRouter = express.Router(); 
const { validateSignUpData } = require('../utils/validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
authRouter.post("/signup",async(req,res)=>{
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
authRouter.post("/login",async(req,res)=>{
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
            const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"}); 
            console.log(token);
            // add the token to the cookies
            res.cookie("token",token,{
                expires:new Date(Date.now()+7*3600000),
                httpOnly:true,
                secure:true,
                sameSite:"none"
            });
            res.send("Login Successfull");
        }
    })
authRouter.get("/signup",async(req,res)=>{
        const userEmail =req.body.emailId;
       try{
           const user = await User.findOne({emailId:userEmail});
           res.send(user);
       }catch(error){
           res.status(400).send("error saving the user:"+error.message);
       }
       });
authRouter.put("/signup",async(req,res)=>{
        const userEmail =req.body.emailId;
       try{
           const user = await User.findOneAndUpdate({emailId:userEmail},{firstName:"deshavath Venkateswara Naik"},{new:true});
           res.send(user);
       }catch(error){
           res.status(400).send("error saving the user:"+error.message);
       }
    });
authRouter.delete("/signup",async(req,res)=>{
        const userEmail =req.body.emailId;
       try{
           const user = await User.findOneAndDelete({emailId:userEmail});
           res.send(user);
       }catch(error){
           res.status(400).send("error saving the user:"+error.message);
       }
    });
    authRouter.post("/logout", async (req, res) => {
        res.cookie("token", null, {
        expires: new Date(Date.now()),
        });
        res.send("Logout Successful!!");
        });
module.exports = authRouter;
const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

requestRouter.get("/sendConnectionrequest", userAuth,async(req, res) =>{
    try {
        const user = req.user; // user is attached to req by userAuth middleware
        const name = user.firstName + " " + user.lastName;
        res.send("The connection request is sent to " + name);
      } catch (error) {
        res.status(401).send("Error is "+error.message);
      }
  })

  module.exports = requestRouter;

  
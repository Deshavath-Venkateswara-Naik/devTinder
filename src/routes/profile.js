const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
  const user = req.user;
  res.send(user);
  } catch (err) {
  res.status(400).send("ERROR : " + err.message);
  }
  });

  profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
    // Step 1: Validate if only allowed fields are being updated
    if (!validateEditProfileData(req)) {
    throw new Error("Invalid Edit Request");
    }// Step 2: Get the authenticated user
    const loggedInUser = req.user;
    // Step 3: Update only the requested fields
    Object.keys(req.body).forEach((key) => {
    loggedInUser[key] = req.body[key];
    });
    // Step 4: Save the updated user to the database
    await loggedInUser.save();
    // Step 5: Send success response
    res.send(`${loggedInUser.firstName}, your profile updated successfully`);
    } catch (err) {
    res.status(400).send("ERROR : " + err.message);
    }
    });
profileRouter.get("/profile", userAuth,async (req, res) => {
    try {
      const user = req.user; // user is attached to req by userAuth middleware
      res.send(user);
    } catch (error) {
      res.status(401).send("Error is "+error.message);
    }
  });


module.exports = profileRouter;

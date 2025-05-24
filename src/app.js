const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");

// Apply adminAuth middleware to all routes under /admin
app.use("/admin", adminAuth);

// Route for /admin/getData
app.use("/admin/getData", (req, res, next) => {
    res.send("Data fetched successfully");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...");
});

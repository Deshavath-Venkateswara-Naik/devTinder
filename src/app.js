const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/requests");
const profileRouter = require("./routes/profile");
 
app.use("/", authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);

connectDB().then(()=>{
    console.log("Databse Connection Established....");
    app.listen(3000, () => {
        console.log("Server is running on port 3000...");
    });
})
.catch((error)=>{
    console.error("Database Connection Failed");

});



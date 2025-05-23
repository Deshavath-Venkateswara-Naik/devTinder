const express = require("express");
 
const app = express();
app.use("/user",(req,res,next)=>{
    console.log("hello");
    next();
},(req,res)=>{
    res.send("ok");
}
);
app.listen(3000,()=>{
    console.log("Server is running on port 3000....");
});
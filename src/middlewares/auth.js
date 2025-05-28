const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdmin = token === "xyz";
    if(!isAdmin){
        res.status(401).send("unauthorizes request");    
    }
    else{
        next();
    } 
};

module.exports ={
    adminAuth
}
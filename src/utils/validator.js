const validator = require("validator");

const validateSignUpData=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;

  if(!firstName || !lastName){
    throw new Error("First name and last name are required");
  }
  else if(!emailId || !validator.isEmail(emailId)){
    throw new Error("Valid email is required");
  }
 else if(!password || !validator.isStrongPassword(password))
    {
        throw new Error("not a strong password");
    } 

}


module.exports ={
    validateSignUpData,
}
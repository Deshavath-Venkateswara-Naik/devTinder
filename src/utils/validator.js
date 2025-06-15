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
const validateEditProfileData = (req) => {
  const allowedEditFields = [
  "firstName",
  "lastName",
  "emailId",
  "photoUrl",
  "gender",
  "age",
  "about",
  "skills"
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
  allowedEditFields.includes(field)
  );
  return isEditAllowed;
  };

module.exports ={
    validateSignUpData,validateEditProfileData,
}
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
firstName: {
type: String,
required: true, // must have a name
},
lastName: {
type: String,
required: true,
unique: true, // no duplicate emails
},
emailId: {
type: String,
required: true,
unique: true,  // if not provided, age will be 18
},
password: {
    type: String,
    required: true,
    unique: true,  // if not provided, age will be 18
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
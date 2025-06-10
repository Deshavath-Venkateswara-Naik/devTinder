const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email"
    }
  },    
  password: {
    type: String,
    required: true,
    unique: true,
    select: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

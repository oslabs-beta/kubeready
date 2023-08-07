//require in mongoose
const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//create model
const User = mongoose.model('User', userSchema);

//export mofe
module.exports = User;

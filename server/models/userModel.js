//require in mongoose
const mongoose = require('mongoose');

// testing to see if connections work first, then will need to refactor mongoDB connections into .env
const myURI =
  'mongodb+srv://serenahromano2000:<E17s30FqKCRZoW5t>@cluster0.krvanjb.mongodb.net/';
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(
  'mongodb+srv://serenahromano2000:passwordforURI@cluster0.x9zlw6i.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

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
  },
});

//create model
const User = mongoose.model('User', userSchema);

//export mofe
module.exports = User;

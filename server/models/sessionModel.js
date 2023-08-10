const mongoose = require('mongoose');

//declare schema
const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;

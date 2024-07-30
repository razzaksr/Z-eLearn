const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  email: { type: String },
  created:{type:Date,default:Date.now,}//get:(val)=>val.toISOString().slice(0,10)}
});

module.exports = mongoose.model('User', userSchema);

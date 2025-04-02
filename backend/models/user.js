const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, ' Email is required'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, ' password is required'],
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

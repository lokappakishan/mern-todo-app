const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to auto update the updatedAt field on save
todoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to auto update the updatedAt field on update
todoSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Middleware to auto update the updatedAt field on findOneAndUpdate
todoSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

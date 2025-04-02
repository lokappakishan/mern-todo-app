// Index.js

// Third party packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Custom modules
const authRouter = require('./Routes/authRoutes');
const todoRouter = require('./Routes/todoRoutes');

//App setup
const app = express();
const PORT = 5001;
const MONGO_URL = process.env.MONGO_URL;

// Middleware to parse json and cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Auth routes
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

// Mongo db connect
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB connection established'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`server listening on port : ${PORT}`);
});

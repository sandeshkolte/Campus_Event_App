const express = require('express');
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');
const appLogger = require('./middlewares/appLogger').default;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-config');
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
require('dotenv').config();
app.use(appLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
});


app.use('/user', userRouter);
app.use('/event', eventRouter);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});

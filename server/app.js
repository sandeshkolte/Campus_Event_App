const express = require('express');
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');
const appLogger = require('./middlewares/appLogger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const db = require('./config/mongoose-config');
const errorMidddleware = require('./middlewares/errorMiddleware');
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());

require('dotenv').config();
app.use(appLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMidddleware)

app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
  cookie: { secure: true }
}))

db.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
});

app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);
app.use('/api/event', eventRouter);

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});

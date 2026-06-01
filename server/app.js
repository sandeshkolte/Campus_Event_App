const express = require('express');
const userModel = require('./models/user')
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');
const galleryRouter = require('./routes/galleryRouter');
const winnerRouter = require('./routes/winnerRouter');
const adminRouter = require('./routes/adminRouter');
const appLogger = require('./middlewares/appLogger');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-config');
const errorMidddleware = require('./middlewares/errorMiddleware');
const app = express();
const session = require('express-session');

const { RedisStore } = require("connect-redis");
const redis = require('redis');

const PORT = process.env.PORT || 9000;

require('dotenv').config();

app.use(cors({
  credentials: true,
}));

app.use(appLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect().catch(console.error);

app.use(
  session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 1000 * 60 * 60, // 1 hour
      },
  })
);

db.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
});

app.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const user = await userModel.findOne({
      verificationToken: token,
      tokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired token.'
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpiry = undefined;

    await user.save();

    console.log("Email verified successfully");

    res.status(200).json({
      message: 'Email verified successfully. You can now log in.'
    });

  } catch (error) {
    console.log("Error:", error);

    res.status(500).json({
      message: 'Server error',
      error
    });
  }
});

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/winners', winnerRouter);
app.use('/api/admin', adminRouter);

app.use(errorMidddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});

const mongoose = require('mongoose');
const User = require('./models/user');
const Event = require('./models/event');
require('dotenv').config();

const syncPaymentStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const users = await User.find({ "myevents.paymentStatus": { $exists: true } });

    let updatedCount = 0;

    for (const user of users) {
      for (const myEvent of user.myevents) {
        await Event.updateOne(
          { _id: myEvent.eventId, "participants.userId": user._id },
          { $set: { "participants.$.paymentStatus": myEvent.paymentStatus } }
        );
        updatedCount++;
      }
    }

    console.log(`Synced payment statuses for ${updatedCount} participants`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error syncing payment status:', error);
    mongoose.disconnect();
  }
};

syncPaymentStatus();

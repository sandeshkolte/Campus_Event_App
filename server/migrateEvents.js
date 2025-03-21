const mongoose = require('mongoose');
const User = require('./models/user');
const Event = require('./models/event');
require('dotenv').config();

const migrateEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const users = await User.find({ "myevents.paymentStatus": "Confirmed" });

    let updatedEventsCount = 0;

    for (const user of users) {
      for (const myEvent of user.myevents) {
        if (myEvent.paymentStatus === "Confirmed") {
          await Event.updateOne(
            { _id: myEvent.eventId, "participants.userId": user._id },
            { $set: { "participants.$.paymentStatus": "Confirmed" } }
          );
          updatedEventsCount++;
        }
      }
    }

    console.log(`Updated events with confirmed payment statuses: ${updatedEventsCount}`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error migrating events:', error);
    mongoose.disconnect();
  }
};

migrateEvents();

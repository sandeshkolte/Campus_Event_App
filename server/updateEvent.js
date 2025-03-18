const mongoose = require('mongoose');
const Event = require('../server/models/event');
require('dotenv').config();

const updateEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const result = await Event.updateMany(
      { $or: [{ isCertificateEnabled: { $exists: false } }, { certificateTemplate: { $exists: false } }] },
      {
        $set: {
          isCertificateEnabled: false,
          certificateTemplate: {
            backgroundImage: null,
            fields: [],
          },
        },
      }
    );

    console.log(`Updated ${result.nModified} events.`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating events:', error);
  }
};

updateEvents();
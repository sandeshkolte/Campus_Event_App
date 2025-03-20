const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust the path if necessary
require('dotenv').config();

const updateUsersBranch = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Update users where branch is missing, null, or an empty string
    const result = await User.updateMany(
      { $or: [{ branch: { $exists: false } }, { branch: null }, { branch: "" }] },
      { $set: { branch: "CSE" } }
    );

    console.log(`Users updated: ${result.modifiedCount}`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating users:', error);
    mongoose.disconnect();
  }
};

updateUsersBranch();

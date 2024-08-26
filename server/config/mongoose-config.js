require('dotenv').config();
const mongoose = require('mongoose')

const myurl = process.env.MONGO_URL;

mongoose.connect(myurl);

module.exports = mongoose.connection
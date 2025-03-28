const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema= mongoose.Schema({
firstname:{
    type:String,
},
lastname:{
    type:String,
},
email:{
    type:String,
    unique:true
},
password:String,
role:{
    type:String,
    default:"user"
},
image:{
    type:String,
    default:"default_profile.jpg"
},
myevents: [{
    eventId: {
        type: ObjectId,
        ref: 'event',
    },
    paymentStatus: {
        type: String,
        default: 'Pending', // 'pending', 'accepted', 'rejected'
        // enum: ['Pending', 'Accepted', 'Rejected']
    },
    paymentScreenshot: {
        type: String, // URL of the uploaded payment screenshot
        default: '' // Initially empty until the user uploads it
    }
}],
eventsorganised:[{  //only for admin and super admin
    type: ObjectId,
    ref: 'event'
}],
branch: String,
 yearOfStudy: {
    type: String,
    default:""
    // required: true
 },
 interests: [{
    type: String
 }],  
contact: {
    type:String,
    default:"",
    // unique:true
},
isVerified: {
    type: Boolean,
    default: false, // New field to track email verification status
  },
  verificationToken: {
    type: String, // New field for email verification token
  },
  tokenExpiry: {
    type: Date, // New field for token expiration time
  },
}, 
{
    timestamps: true 
})

module.exports = mongoose.model("user",userSchema)
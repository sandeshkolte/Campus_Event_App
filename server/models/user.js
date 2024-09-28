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
    default:"https://img.freepik.com/free-photo/cartoon-character-with-fashion-bag_71767-98.jpg?t=st=1724727574~exp=1724731174~hmac=a1b9c25e086fe2c938a61cd9fa2a155f6ec34debd47c147014cb6022df4759c5&w=740"
},
myevents: [{
    eventId: {
        type: ObjectId,
        ref: 'event',
    },
    paymentStatus: {
        type: String,
        default: 'pending', // 'pending', 'accepted'
        enum: ['pending', 'accepted']
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
    type: Number,
    // required: true
 },
 interests: [{
    type: String
 }],  
contact: {
    type:String,
    default:"",
},
}, 
{
    timestamps: true 
})

module.exports = mongoose.model("user",userSchema)
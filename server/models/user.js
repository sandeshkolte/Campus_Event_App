const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema= mongoose.Schema({
username:String,
fullname:String,
email:String,
password:String,
image:String,
myevents:[{
    type: ObjectId,
    ref: 'event'
}],
contact: Number,
}, 
{
    timestamps: true 
})

module.exports = mongoose.model("user",userSchema)
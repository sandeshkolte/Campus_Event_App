const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema= mongoose.Schema({
username:{
    type:String,
    default:""
},
fullname:String,
email:String,
password:String,
role:{
    type:String,
    default:"user"
},
image:{
    type:String,
    default:"https://img.freepik.com/free-photo/cartoon-character-with-fashion-bag_71767-98.jpg?t=st=1724727574~exp=1724731174~hmac=a1b9c25e086fe2c938a61cd9fa2a155f6ec34debd47c147014cb6022df4759c5&w=740"
},
myevents:[{
    type: ObjectId,
    ref: 'event'
}],
contact: {
    type:Number,
    default:0
},
}, 
{
    timestamps: true 
})

module.exports = mongoose.model("user",userSchema)
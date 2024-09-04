const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
title:String,
description:String,
image:String,
category:String,
coordinator:[
    {
//    type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
    type:String,
}
],
price:{
    type:String,
    default:"0"
},
participants:[
    {
//    type: mongoose.Schema.Types.ObjectId,
//     ref: 'user'
    type:String,
}
],
date:{
    type:String
},
venue:String
},
{
    timestamps: true 
})

module.exports = mongoose.model("event",eventSchema)

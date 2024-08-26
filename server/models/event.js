const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
title:String,
description:String,
image:String,
category:String,
coordinator:[
    {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
],
price:{
    type:Number,
    default:0
},
participants:[
    {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
],
date:{
    type:String
}
},
{
    timestamps: true 
})

module.exports = mongoose.model("event",eventSchema)

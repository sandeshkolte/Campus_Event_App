const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
organisedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
organizingBranch:{
    type:String,
    required:true
},
category:[
    {
        type:String
    }
],
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
    type:Date,
    required:true
},
venue:{
    type:String,
    required:true
}
},
{
    timestamps: true 
})

module.exports = mongoose.model("event",eventSchema)

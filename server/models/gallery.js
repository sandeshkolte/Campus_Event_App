const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const gallerySchema= mongoose.Schema({
    title: { type: String, }, 
    imageUrl: { type: String, required: true },
    imageName:{ type: String, required: true },
    uploadedBy:{
        type:ObjectId,
        ref:"user"
    }
},
{
    timestamps: true 
})

module.exports = mongoose.model("gallery",gallerySchema)
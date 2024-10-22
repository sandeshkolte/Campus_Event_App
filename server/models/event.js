const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    organisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    organizingBranch: { type: String },
    category: [{ type: String }],
    coordinator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    price: { type: Number, default: 0 },
    isAuditCourse: { type: Boolean, default: false },
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        groupName: { type: String } // New field for group name if it's a group event
    }],
    isGroupEvent: { type: Boolean, default: false },
    participantSize: { type: Number, default: 1 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    qrImage: { type: String },
    venue: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model("event",eventSchema)
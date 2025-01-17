const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    organisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    organizingBranch: { type: String },
    category: { type: [String], default: [] },
    coordinator: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
    price: { 
        type: Number, 
        default: 0, 
        validate: {
            validator: function(value) {
                return !this.isAuditCourse || value === 0;
            },
            message: 'Audit courses must have a price of 0.'
        }
    },
    isAuditCourse: { type: Boolean, default: false },
    participants: { 
        type: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
            groupName: { type: String }
        }], 
        default: [] 
    },
    isGroupEvent: { type: Boolean, default: false },
    participantSize: {
        type: Number,
        default: 1,
        validate: {
            validator: function(value) {
                return !this.isGroupEvent || value > 1;
            },
            message: 'Group events must have a participant size greater than 1.'
        }
    },
    startDate: { 
        type: Date, 
        required: true, 
        validate: {
            validator: function(value) {
                return value < this.endDate;
            },
            message: 'Start date must be before end date.'
        }
    },
    endDate: { type: Date, required: true },
    qrImage: { type: String },
    venue: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'winner' },
    showWinners: { type: Boolean, default: true },
    slug: { type: String, unique: true }
}, {
    timestamps: true
});

eventSchema.index({ organisedBy: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isActive: 1 });

eventSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/[\s\W-]+/g, '-');
    }
    next();
});

module.exports = mongoose.model("event", eventSchema);

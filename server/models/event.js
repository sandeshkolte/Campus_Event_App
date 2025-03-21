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
        // validate: {
        //     validator: function(value) {
        //         return !this.isAuditCourse || value === 0;
        //     },
        //     message: 'Audit courses must have a price of 0.'
        // }
    },
    isAuditCourse: { type: Boolean, default: false },
    participants: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          groupName: String,
          paymentStatus: { type: String, enum: ["Pending", "Confirmed", "Rejected"], default: "Pending" }, // ✅ New Field
        },
      ],
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
    isCertificateEnabled: { type: Boolean, default: false },
     
    certificateTemplate: { 
        type: {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event',  }, // Ensure correct event reference
            backgroundImage: { type: String,  }, // Ensure a background image is provided
            fields: [
                {
                    id: { type: String,  }, // Unique identifier for the field
                    label: { type: String,  }, // Field label
                    value: { type: String,  }, // Placeholder or actual value
                    position: {
                        x: { type: Number,  }, // X-coordinate (percentage)
                        y: { type: Number,  }, // Y-coordinate (percentage)
                    },
                    size: { type: Number, default: 14 }, // Font size
                    color: { type: String, default: "#000000" }, // Font color
                },
            ],
        },
        default: {}, // This allows the event to be created without a certificate initially
    },
    
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

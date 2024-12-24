const mongoose = require('mongoose')

const winnerSchema = mongoose.Schema({
    winners: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          position: { type: String },
        },
      ],
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', required: true },
      showWinners: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model("winner",winnerSchema)
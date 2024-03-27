const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: 'Chat'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// chatSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'user',
//     select: '_id name photo'
//   });
//   next();
// });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

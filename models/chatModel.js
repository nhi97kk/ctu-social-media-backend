const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

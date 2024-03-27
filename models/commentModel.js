const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true
    },
    likes: [],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: '_id name photo'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

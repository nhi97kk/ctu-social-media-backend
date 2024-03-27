const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getComment = factory.getOne(Comment);
exports.getAllComments = factory.getAll(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);

exports.getAllCommentsPost = catchAsync(async (req, res, next) => {
  const allCommentsOfPost = await Comment.find({ post: req.params.postId });

  res.status(200).json({
    status: 'success',
    data: allCommentsOfPost
  });
});

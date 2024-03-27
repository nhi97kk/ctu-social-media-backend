const Chat = require('../models/chatModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getChat = factory.getOne(Chat);
exports.getAllChats = factory.getAll(Chat);
exports.createChat = factory.createOne(Chat);
exports.updateChat = factory.updateOne(Chat);
exports.deleteChat = factory.deleteOne(Chat);

exports.getAllChatsUser = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({ members: { $in: [req.params.userId] } });

  res.status(200).json({
    status: 'success',
    data: chats
  });
});

const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getMessage = factory.getOne(Message);
exports.getAllMessages = factory.getAll(Message);
exports.createMessage = factory.createOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);

exports.getAllMessagesOfChats = catchAsync(async (req, res, next) => {
  const messages = await Message.find({ chat: req.params.chatId });

  res.status(200).json({
    status: 'success',
    data: messages
  });
});

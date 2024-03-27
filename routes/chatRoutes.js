const express = require('express');
const authController = require('./../controllers/authController');
const chatController = require('./../controllers/chatController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(chatController.getAllChats)
  .post(chatController.createChat);

router
  .route('/:id')
  .get(chatController.getChat)
  .delete(chatController.deleteChat);

router.route('/chat/:userId').get(chatController.getAllChatsUser);

module.exports = router;

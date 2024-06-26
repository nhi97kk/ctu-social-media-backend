const express = require('express');
const authController = require('./../controllers/authController');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

router.route('/post/:postId').get(commentController.getAllCommentsPost);

module.exports = router;

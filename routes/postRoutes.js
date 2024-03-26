const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    postController.uploadPostPhoto,
    postController.resizePostPhoto,
    postController.createPost
  );

router
  .route('/:id')
  .get(postController.getPost)
  .post(postController.updatePost);

router.post('/:id/like', postController.likePost);

module.exports = router;

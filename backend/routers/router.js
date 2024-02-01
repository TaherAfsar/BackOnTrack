const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const postController = require('../controllers/postController');



// Create a post
router.post('/posts', postController.createPostMiddleware, postController.createPost);

// Read all posts
router.get('/all-posts', postController.getAllPostsOfUsers);
router.post("/admin/login", adminController.login);
router.post("/admin/sign-up", adminController.createAdmin);
router.post("/user/login", userController.login);
router.post("/user/create-user", userController.addUser)
router.get("/", (req, res) => {
  res.send("Hello, this is a simple route!");
});

// Export the router
module.exports = router;

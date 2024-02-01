const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads"); // Specify your desired upload directory
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const createPostMiddleware = upload.single("image");
const createPost = async (req, res) => {
  try {
    const { title, description, anonymous } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    const post = new Post({
      title,
      description,
      image,
      anonymous,
    });

    const savedPost = await post.createPost();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllPostsOfUsers = async (req, res) => {
  try {
    let post = new Post();
    const posts = await post.getAllPostsOfUsers();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPostMiddleware,
  getAllPostsOfUsers,
  createPost
};

const { ObjectId } = require("mongodb");
const postsCollection = require("../db").collection("posts");

function Post(data) {
  this.data = data;
}

Post.prototype.createPost = async function () {
  const post = {
    title: this.data.title,
    description: this.data.description,
    image: this.data.image,
    anonymous: this.data.anonymous || false,
  };

  await postsCollection.insertOne(post);
  return post;
};

Post.prototype.getAllPostsOfUsers = async function () {
  const posts = await postsCollection.find({}).toArray();
  return posts;
};

module.exports = Post;

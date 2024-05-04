const Post = require('./post')

const postByTitle = (title) => {
  return Post.findOne({ title: title }).exec();
}

const postsForAuthor = (authorId) => {
  return Post.find({author: authorId}).exec();
}

const fullPostById = (id) => {
  return Post.findById(id)
      .populate("author")
      .populate("post")
      .exec();
}

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}).projection(fieldsToSelect).exec();
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.where("contentLength")
      .gte(minContentLength)
      .lte(maxContentLength)
      .exec();
}

const addSimilarPosts = (postId, similarPosts) => {
  return Post.updateOne({_id: postId}, {$push: {similarPost: {$each: similarPosts}}}, {new: true});
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}

import mongoose from "mongoose";

const Post = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;

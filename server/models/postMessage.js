import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
  creator: String,
  name: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
});

var postMessage = mongoose.model("PostMessage", postSchema);
export default postMessage;

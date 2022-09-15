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
});

const postMessage = mongoose.model("PostMessage", postSchema);
export default postMessage;

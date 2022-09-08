import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  tag: [String],
  creator: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const postMessage = mongoose.model("PostMessage", postSchema);
export default postMessage;

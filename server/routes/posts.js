import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.get("/:id", getPost);
routes.get("/", getPosts);
routes.get("/search", getPostsBySearch);
routes.post("/", auth, createPost);
routes.patch("/:id", auth, updatePost);
routes.delete("/:id", auth, deletePost);
routes.patch("/:id/likeCount", auth, likePost);
routes.post("/:id/comment", auth, commentPost);

export default routes;

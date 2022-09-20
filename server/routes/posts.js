import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.get("/", getPosts);
routes.get("/search", getPostsBySearch);
routes.post("/", auth, createPost);
routes.patch("/:id", auth, updatePost);
routes.delete("/:id", auth, deletePost);
routes.patch("/:id/likeCount", auth, likePost);

export default routes;

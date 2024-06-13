// routes/postRoutes.js
import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserWithPostAndComments,
} from "./post.controllers.js";

const postRouter = express.Router();

postRouter.route("/").post(createPost).get(getPosts);
postRouter.route("/:id").get(getPostById).put(updatePost).delete(deletePost);
postRouter.get("/user/:userId/post/:postId", getUserWithPostAndComments);

export default postRouter;

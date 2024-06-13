// routes/commentRoutes.js
import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "./comment.controllers.js";

const commentRouter = express.Router();

commentRouter.route("/").post(createComment).get(getComments);
commentRouter
  .route("/:id")
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);

export default commentRouter;

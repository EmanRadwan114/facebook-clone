import { Comment, Post, User } from "../../database/models.js";

// Create a comment
export const createComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["title"],
        },
      ],
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific comment by ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["title"],
        },
      ],
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment || comment.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Comment not found or unauthorized" });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment || comment.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Comment not found or unauthorized" });
    }
    await comment.destroy();
    res.status(204).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

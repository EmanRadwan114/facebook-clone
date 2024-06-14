import { Post, User, Comment } from "../../database/models.js";

// Create a post
export const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, authorId } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the authenticated user is the author of the post
    if (post.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this post" });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post (soft delete)
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { authorId } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Check if the authenticated user is the author of the post
    if (post.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }
    // Soft delete the post by setting deletedAt
    await post.destroy({ force: false }); // force: false triggers soft delete
    res.json({ message: "Post soft deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific user with a specific post and post’s comments
export const getUserWithPostAndComments = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "email"] },
      include: [
        {
          model: Post,
          where: { id: postId },
          include: [
            {
              model: Comment,
            },
          ],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User or post not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

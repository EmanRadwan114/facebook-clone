import User from "../modules/user/user.models.js";
import Post from "../modules/post/post.models.js";
import Comment from "../modules/comment/comment.models.js";
import sequelize from "./dbConnection.js";

User.hasMany(Post, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

const initModels = async () => {
  await sequelize.sync();
};

export { User, Post, Comment, initModels };

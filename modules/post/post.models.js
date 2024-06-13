import { DataTypes } from "sequelize";
import sequelize from "../../database/dbConnection.js";

const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // for soft delete
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null to indicate active records
    },
  },
  {
    // Enable soft delete (adds deletedAt column and handles soft deletes)
    paranoid: true,
  }
);

export default Post;

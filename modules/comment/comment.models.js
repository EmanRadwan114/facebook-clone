import { DataTypes } from "sequelize";
import sequelize from "../../database/dbConnection.js";

const Comment = sequelize.define(
  "Comment",
  {
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

export default Comment;

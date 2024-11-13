// src/models/Comment.ts
import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface CommentAttributes {
  id: number;
  content: string;
  postId: number; // Reference to the post being commented on
}

type CommentCreationAttributes = Optional<CommentAttributes, "id">;

export default (sequelize: Sequelize) => {
  class Comment
    extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes
  {
    public id!: number;
    public content!: string;
    public postId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: "",
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      timestamps: true,
    },
  );

  return Comment;
};

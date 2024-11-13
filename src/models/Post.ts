// src/models/Post.ts
import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
}

type PostCreationAttributes = Optional<PostAttributes, "id">;

export default (sequelize: Sequelize) => {
  class Post
    extends Model<PostAttributes, PostCreationAttributes>
    implements PostAttributes
  {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: "",
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: true,
    },
  );

  return Post;
};

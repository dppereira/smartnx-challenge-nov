// src/models/Comment.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbPg";
class Comment extends Model {
}
Comment.init({
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Comment",
});
export default Comment;

const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Post extends Model { }

Post.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3,
            },
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: db,
        modelName: "post",
    }
);

module.exports = Post;
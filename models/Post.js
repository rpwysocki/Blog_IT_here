const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3,
            },
        },
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
    },
    {
        sequelize: db,
        modelName: "post",

    }
);

module.exports = Post;
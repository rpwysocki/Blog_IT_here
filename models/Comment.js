const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3
            }
        }
    },
    {
        sequelize: db,
        modelName: 'Comment'
    });


module.exports = Comment;
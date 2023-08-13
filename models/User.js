const { Model, DataTypes } = require("sequelize");
const { hash, compare } = require("bcrypt");
const db = require("../config/connection");


class User extends Model { }

User.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 3,
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            min: 6
        }
    }
}, {
    sequelize: db,
    modelName: "user",
    hooks: {
        async beforeCreate(user) {
            const hashPassword = await hash(user.password, 10);

            user.password = hashPassword;
            return user;
        },
    },
});

// User.prototype.validatePass = async function (formPassword) {
//     const isValid = await compare(formPassword, this.password);

//     return isValid;
// }


// User.hasMany(Post);
// Post.belongsTo(User);

module.exports = User;
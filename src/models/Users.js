const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const User = sequelize.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User;

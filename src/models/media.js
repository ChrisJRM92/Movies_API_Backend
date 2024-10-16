const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Media = sequelize.define('media', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Media;

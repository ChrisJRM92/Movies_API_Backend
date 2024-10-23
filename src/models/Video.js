const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Video = sequelize.define('video', {
  title: {
    type: DataTypes.STRING,
    // allowNull: false,
    defaultValue: 'Unnamed Video',
  },
  path: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  format: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, 
    // allowNull: true,
  },
}, {
  timestamps: false,
})

module.exports = Video;

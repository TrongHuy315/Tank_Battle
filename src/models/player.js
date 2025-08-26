const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Player = sequelize.define('Player', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  register_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  elo: {
    type: DataTypes.INTEGER,
    defaultValue: 1000
  },
  wins: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  losses: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'players',
  timestamps: false
});

module.exports = Player;

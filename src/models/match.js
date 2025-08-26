const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Player = require('./player');

const Match = sequelize.define('Match', {
  room_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  winner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: 'id'
    }
  },
  loser_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: 'id'
    }
  }
}, {
  tableName: 'match_history',
  timestamps: false
});

// Thiết lập mối quan hệ (nếu cần dùng sau này)
Player.hasMany(Match, { foreignKey: 'winner_id', as: 'Wins' });
Player.hasMany(Match, { foreignKey: 'loser_id', as: 'Losses' });
Match.belongsTo(Player, { foreignKey: 'winner_id', as: 'Winner' });
Match.belongsTo(Player, { foreignKey: 'loser_id', as: 'Loser' });

module.exports = Match;

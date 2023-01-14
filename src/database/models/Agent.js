'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    static associate(models) {
      // define association here
      Agent.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  Agent.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id'
    },
    subsidiaryId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'subsidiary_id'
    }
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};
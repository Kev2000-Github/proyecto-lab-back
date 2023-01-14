'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
    }
  }
  Session.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_id'
    }
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};
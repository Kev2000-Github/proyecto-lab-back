'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
    }
  }
  
  Role.init({
    id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'role',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Role;
};
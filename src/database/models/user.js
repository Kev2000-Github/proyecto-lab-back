'use strict';
const {
  Model
} = require('sequelize');
const { enumFields } = require('../helper')
const { ROLES } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Session, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This username is already in use"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: enumFields(DataTypes, ROLES, ROLES.AGENT)
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return User;
};
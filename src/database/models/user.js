'use strict';
const {
  Model
} = require('sequelize');
const { enumFields } = require('../helper')
const { ROLES } = require('../constants');
const { hashPassword } = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Session, {
        foreignKey: 'user_id'
      })
      User.belongsTo(models.Subsidiary, {
        foreignKey: 'subsidiary_id'
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
    role: enumFields(DataTypes, ROLES, ROLES.AGENT),
    subsidiaryId: {
      type: DataTypes.STRING,
      field: 'subsidiary_id',
      references: {
        model: 'subsidiary',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: async function (user) {
        const newPass = await hashPassword(10, user.password)
        user.password = newPass
      },
      beforeUpdate: async function (user) {
        const newPass = await hashPassword(10, user.password)
        user.password = newPass
      }
    }
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
const { enumFields } = require('../helper')
const { ROLES } = require('../constants');
const { HttpStatusError } = require('../../errors/httpStatusError');
const { hashPassword } = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Session, {
        foreignKey: 'user_id'
      })
      User.hasOne(models.Agent, {
        foreignKey: 'user_id',
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
    paranoid: true,
    hooks: {
      afterDestroy: async function (user, {transaction}) {
        if(user.role === ROLES.AGENT){
          const agent = await user.getAgent()
          if(!agent) throw HttpStatusError.notFound("Fatal: Agent not found")
          await agent.destroy({transaction})
        }
      },
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
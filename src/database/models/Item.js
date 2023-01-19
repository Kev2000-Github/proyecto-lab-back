'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsToMany(models.Group, {
        through: models.ItemGroup
      })
      Item.belongsToMany(models.Subsidiary, {
        through: models.ItemSubsidiary
      })
    }
  }
  Item.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "this code is already in use, please use another"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'item',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Item;
};
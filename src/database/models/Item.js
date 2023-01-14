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
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    photo: DataTypes.TEXT,
    deleted_at: DataTypes.DATE
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
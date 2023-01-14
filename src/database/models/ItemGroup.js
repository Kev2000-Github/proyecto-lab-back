'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGroup extends Model {
    static associate(models) {}
  }
  
  ItemGroup.init({}, {
    sequelize,
    modelName: 'ItemGroup',
    tableName: 'item_group',
    underscored: true,
    timestamps: false,
  });
  return ItemGroup;
};
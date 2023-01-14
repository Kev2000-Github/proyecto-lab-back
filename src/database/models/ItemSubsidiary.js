'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemSubsidiary extends Model {
    static associate(models) {}
  }
  
  ItemSubsidiary.init({}, {
    sequelize,
    modelName: 'ItemSubsidiary',
    tableName: 'item_subsidiary',
    underscored: true,
    timestamps: false,
  });
  return ItemSubsidiary;
};
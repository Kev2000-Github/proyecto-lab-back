'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemSubsidiary extends Model {
    static associate(models) {
      ItemSubsidiary.belongsTo(models.Item, {
        foreignKey: 'item_id'
      })
      ItemSubsidiary.belongsTo(models.Subsidiary, {
        foreignKey: "subsidiary_id"
      })
    }
  }
  
  ItemSubsidiary.init({
    itemId: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'item_id',
      references: {
        model: 'item',
        key: 'id'
      }
    },
    subsidiaryId: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'subsidiary_id',
      references: {
        model: 'subsidiary',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'ItemSubsidiary',
    tableName: 'item_subsidiary',
    underscored: true,
    timestamps: false,
  });
  return ItemSubsidiary;
};
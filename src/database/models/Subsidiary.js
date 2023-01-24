'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subsidiary extends Model {
    static associate(models) {
      Subsidiary.belongsToMany(models.Item, {
        through: models.ItemSubsidiary
      })
      Subsidiary.hasMany(models.User, {
        foreignKey: 'subsidiary_id'
      })
    }
  }
  Subsidiary.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Subsidiary',
    tableName: 'subsidiary',
    underscored: true,
    timestamps: true,
    paranoid: true
  });
  return Subsidiary;
};
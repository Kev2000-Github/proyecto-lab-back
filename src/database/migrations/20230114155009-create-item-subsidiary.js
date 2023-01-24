'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item_subsidiary', {
      item_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'item',
          key: 'id'
        }
      },
      subsidiary_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'subsidiary',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item_subsidiary');
  }
};
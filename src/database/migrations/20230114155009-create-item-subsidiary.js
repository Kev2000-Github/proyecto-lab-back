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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item_subsidiary');
  }
};
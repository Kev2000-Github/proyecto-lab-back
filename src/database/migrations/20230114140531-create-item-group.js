'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item_group', {
      item_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'item',
          key: 'id'
        }
      },
      group_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'group',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('item_group');
  }
};
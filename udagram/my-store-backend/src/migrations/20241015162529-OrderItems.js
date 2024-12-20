'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE OrderItems (id serial primary key, orderId bigint REFERENCES Orders(id), productId bigint REFERENCES Products(id), quantity integer);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TABLE OrderItems;
    `);
  }
};
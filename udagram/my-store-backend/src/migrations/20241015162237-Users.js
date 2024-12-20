'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE Users (
      id serial primary key, 
      fullName varchar(50) not null, 
      password varchar(100) not null
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TABLE Users;
    `);
  }
};

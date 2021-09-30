'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('categories', [
      {
        name: "Computers",
        createdAt : faker.date.past(2) ,
        updatedAt : faker.date.past(2) ,
      },
      {
        name: "Games",
        createdAt : faker.date.past(2) ,
          updatedAt : faker.date.past(2) ,
        
      }
      
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

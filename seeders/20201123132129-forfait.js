'use strict';

const { fake } = require('faker');
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

      return queryInterface.bulkInsert('forfaits', [
        {
          nom: "Basic Forfait",
          prix: 9.99,
          description: faker.lorem.text(10),
          createdAt : faker.date.past(2) ,
          updatedAt : faker.date.past(2) ,
          
        },
        {
          nom: "Normal Forfait",
          prix: 19.99,
          description: faker.lorem.text(10),
          createdAt : faker.date.past(2) ,
          updatedAt : faker.date.past(2) ,
        },
        {
          nom: "Best Forfait",
          prix: 25.99,
          description: faker.lorem.text(10),
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
    return queryInterface.bulkDelete('forfaits', null, {})
  }
};

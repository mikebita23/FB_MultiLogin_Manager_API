'use strict';

const faker = require('faker');

const produitsList = [];

for (let i = 0; i < 600; i++) {
  produitsList.push({
    
    name: faker.name.firstName(),
    category: faker.lorem.sentence(),
    sku: faker.random.number({min: 1000, max: 2000}),
    price:faker.random.number({min: 1000, max: 2000}),
    quantity: faker.random.number({min: 1000, max: 2000}),
    createdAt : faker.date.past(2) ,
    updatedAt : faker.date.past(2) ,
  });
}

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
     return queryInterface.bulkInsert('produits', produitsList, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('produits', null, {})
  }
};
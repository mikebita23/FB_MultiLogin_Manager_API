'use strict';

const faker = require('faker');

const messagesLists = [];

for (let i = 0; i < 600; i++) {
  messagesLists.push({
    Object: faker.lorem.text(5),
    Content: faker.lorem.text(5),
    senderId: faker.random.number({min: 1000, max: 2000})
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
   return queryInterface.bulkInsert('messages', messagesLists, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('messages', null, {})
  }
};

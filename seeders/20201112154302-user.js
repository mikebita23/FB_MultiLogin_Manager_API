'use strict';

const faker = require('faker');

const usersList =  [];

for (let i = 0; i < 1000; i++) {
    usersList.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber('0#########'),
      passWord: faker.internet.password(),
      role: "USER",
      forfaitId: faker.random.number({min: 1, max: 3}),
      createdAt : faker.date.past(2) ,
          updatedAt : faker.date.past(2) ,
    })
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
      return queryInterface.bulkInsert('Users', usersList, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {})

  }
};

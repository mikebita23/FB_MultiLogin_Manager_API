'use strict';

const faker = require('faker');

const session_List =  [];

for (let i = 0; i < 1000; i++) {
    session_List.push({
        nom_session: faker.lorem.text(10),
        nom_luminati: faker.lorem.text(12),
        proxy_luminati: faker.lorem.text(10),
        port_luminati: faker.lorem.text(10),
        status: faker.random.number({min:-1, moyen:1, max:1}),
        isBlocked: faker.random.boolean(),
       forfaitId: faker.random.number({min: 1, max: 3}),
       userId: faker.random.number({min: 1, max:50})
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
      return queryInterface.bulkInsert('Sessions', session_List, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Session', null, {})

  }
};

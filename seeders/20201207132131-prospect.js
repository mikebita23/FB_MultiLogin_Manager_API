'use strict';

const faker = require('faker');

const prospectList =  [];

for (let i = 0; i < 1000; i++) {
    prospectList.push({
      nom_Prospect: faker.name.firstName(),
      prenom_Prospect: faker.name.lastName(),
      numero_tel: faker.lorem.text(12),
      
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
      return queryInterface.bulkInsert('Prospects', prospectList, {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Prospects', null, {})

  }
};

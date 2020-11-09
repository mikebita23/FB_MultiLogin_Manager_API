'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      // Columns Creation
      await queryInterface.addColumn("Users", "role", { type: Sequelize.STRING } );
      await queryInterface.addColumn("Users", "forfaitId", { type: Sequelize.INTEGER } );
      // Commiting changes
      await transaction.commit();
      return Promise.resolve();

    } catch (error) {
      if (transaction) {
        // Undo the commit in case of error
        await transaction.rollback();
      }
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      
      await queryInterface.removeColumn("Users", "role", { type: Sequelize.STRING } );
      await queryInterface.removeColumn("Users", "forfaitId", { type: Sequelize.INTEGER, allowNull: true } );
      
      await transaction.commit();
      return Promise.resolve();
    
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(err);
    }
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_session: {
        type: Sequelize.STRING
      },
      
      nom_luminati: {
        type: Sequelize.STRING
      },
      proxy_luminati: {
        type: Sequelize.TEXT
      },
      port_luminati: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
     forfaitId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        
      },
    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};
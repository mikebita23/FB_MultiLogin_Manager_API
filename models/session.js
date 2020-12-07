'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Forfait, {
        foreignKey: 'forfaitId',
    
        
      })
      this.belongsTo(models.User, {
      
        foreignKey: 'userId',
        
      })
    }
  };
  Session.init({
    nom_session: DataTypes.STRING,
    nom_luminati: DataTypes.STRING,
    proxy_luminati: DataTypes.STRING,
    port_luminati: DataTypes.STRING,
    status: DataTypes.INTEGER,
    isBlocked:DataTypes.BOOLEAN,
    forfaitId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};
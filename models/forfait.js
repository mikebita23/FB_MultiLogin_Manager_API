'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forfait extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.associateToUser = this.belongsTo(models.User, {
        foreignKey: 'senderId',
        onDelete: 'CASCADE'
      }),
        this.hasMany(models.Session,{
       
      })
    }
  };
  Forfait.init({
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Forfait',
  });
  return Forfait;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class forfait extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.AssociateToUser = this.hasMany(models.User, {
          foreignKey: 'id'
      });
    }
  };
  forfait.init({
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'forfait',
  });
  return forfait;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prospect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prospect.init({
    nom_Prospect: DataTypes.STRING,
    prenom_Prospect:DataTypes.STRING,
    numero_tel:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Prospect',
  });
  return Prospect;
};
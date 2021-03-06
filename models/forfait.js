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
      this.AssociateToUser = this.hasMany(models.User, {
          foreignKey: 'id'
      });
    }
  };
  Forfait.init({
    nom: DataTypes.STRING,
    prix: DataTypes.FLOAT,
    prix_base: DataTypes.FLOAT,
    nb_session: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'forfait',
  });
  return Forfait;
};
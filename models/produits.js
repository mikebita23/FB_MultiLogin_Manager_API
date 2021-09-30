'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.associateToCategory = this.belongsTo(models.category, {
      //   foreignKey: 'categoryId',
      //   onDelete: 'CASCADE'
      // })
    }
  };
  Produits.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    sku: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produits',
  });
  return Produits;
};
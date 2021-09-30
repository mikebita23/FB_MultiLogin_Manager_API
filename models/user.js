'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.AssociateToForfait = this.belongsTo(models.Forfait, {
        foreignKey: 'forfaitId',
        onDelete: 'CASCADE'
      });

      this.AssociateToMessage = this.hasMany(models.Message,{
        foreignKey: 'id'
      })

    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    passWord: DataTypes.STRING,
    role: DataTypes.STRING,
    forfaitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
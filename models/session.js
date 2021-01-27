'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.AssociateToMessage = this.belongsTo(models.User, {
        foreignKey: 'owner',
        onDelete: 'CASCADE'
      })
    }
  };
  session.init({
    credentials: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};
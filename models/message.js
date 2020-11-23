'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
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
      })
    }
  };
  Message.init({
    Object: DataTypes.STRING,
    Content: DataTypes.TEXT,
    senderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
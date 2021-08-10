'use strict';
const {
  Model
} = require('sequelize');
const users = require('./users');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {users, contents, comments} = models;
      comments.belongsTo(users, {foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade'});
      comments.belongsTo(contents, {foreignKey: 'contentId', targetKey: 'id', onDelete: 'cascade'});
    }
  };
  comments.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'comments',
    timestamps: true,
  });
  return comments;
};
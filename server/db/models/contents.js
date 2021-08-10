'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {users, contents, comments} = models;
      contents.hasMany(comments, {foreignKey: 'contentId', sourceKey: 'id'});
      contents.belongsTo(users, {foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade'});
    }
  };
  contents.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'contents',
    timestamps: true,
  });
  return contents;
};
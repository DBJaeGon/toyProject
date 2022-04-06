"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { users, images, imageComments } = models;
      images.hasMany(imageComments, { foreignKey: "imageId", sourceKey: "id" });
      images.belongsTo(users, { foreignKey: "userId", targetKey: "id", onDelete: "cascade" });
    }
  }
  images.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageContent: {
        type: DataTypes.TEXT,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "images",
      timestamps: true,
    }
  );
  return images;
};

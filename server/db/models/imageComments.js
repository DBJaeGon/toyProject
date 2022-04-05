"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class imageComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { users, images, imageComments } = models;
      imageComments.belongsTo(users, {
        foreignKey: "userId",
        targetKey: "id",
        onDelete: "cascade",
      });
      imageComments.belongsTo(images, {
        foreignKey: "imageId",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  imageComments.init(
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "imageComments",
      timestamps: true,
    }
  );
  return imageComments;
};

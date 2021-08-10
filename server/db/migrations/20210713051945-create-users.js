'use strict';
const {users} = require('../models');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.UUID
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING
      },
      userImage: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      token: {
        type: Sequelize.STRING
      },
      accessToken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
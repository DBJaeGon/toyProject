require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    options: {
      define: {
        timestamps: false,
        freezeTableName: true
      }
    },
    dialect: 'mysql',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'mysql',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
}
'use strict';
const { Model, Sequelize } = require('sequelize');
const argon2 = require('argon2');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    get fullName() {
      return this.firstName + ' ' + this.lastName;
    }

    static associate(models) {
      const {users, contents, comments} = models;
      users.hasMany(contents, {foreignKey: 'userId', sourceKey: 'id'});
      users.hasMany(comments, {foreignKey: 'userId', sourceKey: 'id'});
    }
  };
  users.init({
    uid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        max: 50
      }
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   is: {
      //     args: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
      //     msg: `Passwords must be
      //     - At least 8 characters long, max length 20
      //     - Include at least 1 lowercase letter, 1 capital letter, 1 number, 1 special character => !@#$%^&*
      //     `
      //   }
      // }
    },
    provider: {
      type: DataTypes.STRING,
      defaultValue: 'local'
    },
    userImage: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING
    },
    accessToken: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        if(user.password) {
          const hash = await argon2.hash(user.password);
          user.password = hash;
        }
      },
      beforeUpdate: async(user, options) => {
        if(user.password) {
          const hash = await argon2.hash(user.password);
          user.password = hash;
        }
      }
    },
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: false
  });
  return users;
};

/*
function type
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        max: 50
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        otEmpty: true,
        len: [8, 16]
      }
    },
    userImage: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    tokenExp: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: true,
    createdAt: true
  });

  user.associate(db) {

  }
  return user;
};
*/
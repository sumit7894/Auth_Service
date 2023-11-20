'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{
        through: 'User_Roles',
      });
    }
  }
  const bcrypt = require('bcrypt');
  const {SALT} = require('../config/serverConfig');
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      len:[3,300]
    }
  }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((User)=>{
    const encryptedPassword = bcrypt.hashSync(User.password,SALT);
    User.password = encryptedPassword;
  })
  return User;
};
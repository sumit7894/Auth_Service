'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{
        through:'User_Roles',
      });
    }
  }
  Role.init({
    name: 
    {
    type: DataTypes.STRING,
    allowNull: false,
  },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
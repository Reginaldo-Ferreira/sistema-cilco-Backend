'use strict';
module.exports = (sequelize, DataTypes) => {
  const FuncaosUsers = sequelize.define('FuncaosUsers', {
    
  }, {});
  FuncaosUsers.associate = function(models) {
    FuncaosUsers.belongsTo(models.Users);
    FuncaosUsers.belongsTo(models.Funcoes); 
  };
  return FuncaosUsers;
};
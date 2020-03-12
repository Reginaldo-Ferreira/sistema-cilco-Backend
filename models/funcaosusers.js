'use strict';
module.exports = (sequelize, DataTypes) => {
  const FuncaosUsers = sequelize.define('FuncaosUsers', {
    
  }, {});
  FuncaosUsers.associate = function(models) {
    FuncaosUsers.belongsTo(models.Alunos);
    FuncaosUsers.belongsTo(models.Funcoes); 
  };
  return FuncaosUsers;
};
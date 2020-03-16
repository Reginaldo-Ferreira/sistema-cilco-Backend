'use strict';
module.exports = (sequelize, DataTypes) => {
  const Funcoes = sequelize.define('Funcoes', {
    descricao: DataTypes.STRING(30),
    ativo: DataTypes.BOOLEAN
  }, {});
  Funcoes.associate = function(models) {
    // associations can be defined here
  //  Funcoes.hasMany(models.Users);
  };
  return Funcoes;
};
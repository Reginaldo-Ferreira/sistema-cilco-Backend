'use strict';
module.exports = (sequelize, DataTypes) => {
  const funcao = sequelize.define('Funcoes', {
    descricao: DataTypes.STRING(30)
  }, {});
  funcao.associate = function(models) {
    // associations can be defined here
  };
  return funcao;
};
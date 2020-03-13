'use strict';
module.exports = (sequelize, DataTypes) => {
  const funcao = sequelize.define('Funcoes', {
    descricao: DataTypes.STRING(30),
    ativo: DataTypes.BOOLEAN
  }, {});
  funcao.associate = function(models) {
    // associations can be defined here
  };
  return funcao;
};
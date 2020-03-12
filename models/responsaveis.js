'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responsaveis = sequelize.define('Responsaveis', {
    name: DataTypes.STRING(45),
    ativo: DataTypes.BOOLEAN
  }, {});
  Responsaveis.associate = function(models) {
    // associations can be defined here
  };
  return Responsaveis;
};
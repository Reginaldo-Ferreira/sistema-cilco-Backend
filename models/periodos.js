'use strict';
module.exports = (sequelize, DataTypes) => {
  const Periodos = sequelize.define('Periodos', {
    descricao: DataTypes.STRING(20)
  }, {});
  Periodos.associate = function(models) {
    // associations can be defined here
  };
  return Periodos;
};
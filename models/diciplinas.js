'use strict';
module.exports = (sequelize, DataTypes) => {
  const Diciplinas = sequelize.define('Diciplinas', {
    descricao: DataTypes.STRING(30),
    carga: DataTypes.INTEGER,
    totaulas: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN
  }, {});
  Diciplinas.associate = function(models) {
    // associations can be defined here
  };
  return Diciplinas;
};
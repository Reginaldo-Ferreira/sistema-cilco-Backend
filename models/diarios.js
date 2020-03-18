'use strict';
module.exports = (sequelize, DataTypes) => {
  const Diarios = sequelize.define('Diarios', {
    json: DataTypes.TEXT
  }, {});
  Diarios.associate = function(models) {
    Diarios.belongsTo(models.Matriculas);
  };
  return Diarios;
};
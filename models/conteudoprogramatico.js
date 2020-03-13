'use strict';
module.exports = (sequelize, DataTypes) => {
  const ConteudoProgramatico = sequelize.define('ConteudoProgramaticos', {
    data: DataTypes.DATE,
    titulo: DataTypes.STRING(45),
    corpo: DataTypes.TEXT,
    observacao: DataTypes.STRING(200)
  }, {});
  ConteudoProgramatico.associate = function(models) {
    ConteudoProgramatico.belongsTo(models.turmas);
  };
  return ConteudoProgramatico;
};
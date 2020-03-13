'use strict';
module.exports = (sequelize, DataTypes) => {
  const Avaliacoes = sequelize.define('Avaliacoes', {
    bimestre: DataTypes.INTEGER,
    projeto1: DataTypes.FLOAT,
    projeto2: DataTypes.FLOAT,
    prova: DataTypes.FLOAT,
    provaRecuracao: DataTypes.FLOAT,
    aprovado: DataTypes.BOOLEAN,
    deRecuperacao: DataTypes.BOOLEAN,
    totalFalta: DataTypes.INTEGER,
    inicioBim: DataTypes.DATE,
    terminoBim: DataTypes.DATE,
    participacao: DataTypes.FLOAT
  }, {});
  Avaliacoes.associate = function(models) {
    Avaliacoes.belongsTo(models.Matriculas);
  };
  return Avaliacoes;
};
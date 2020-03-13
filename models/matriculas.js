'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define('Matriculas', {
    situacao: DataTypes.BOOLEAN,
    trancado: DataTypes.BOOLEAN,
    data_trancado: DataTypes.DATE,
    semestre: DataTypes.INTEGER,
    inicioSemest: DataTypes.DATE,
    terminoSemest: DataTypes.DATE
  }, {});
  Matriculas.associate = function(models) {
    Matriculas.belongsTo(models.Alunos);
    Matriculas.belongsTo(models.Diciplinas);
    Matriculas.belongsTo(models.Periodos);
    Matriculas.belongsTo(models.turmas);
  };
  return Matriculas;
};
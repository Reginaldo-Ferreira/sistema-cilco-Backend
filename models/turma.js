'use strict';
module.exports = (sequelize, DataTypes) => {
  const turma = sequelize.define('turmas', {
    descricao: DataTypes.STRING(10),
    anoLetivo: DataTypes.INTEGER,
    semestre: DataTypes.INTEGER
  }, {});
  turma.associate = function(models) {
    turma.belongsTo(models.Professors);
  };
  return turma;
};
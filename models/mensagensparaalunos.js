'use strict';
module.exports = (sequelize, DataTypes) => {
  const mensagensParaAlunos = sequelize.define('mensagensParaAlunos', {
    assunto: DataTypes.STRING(45),
    texto: DataTypes.TEXT,
    ativo: DataTypes.BOOLEAN
  }, {});
  mensagensParaAlunos.associate = function(models) {
    mensagensParaAlunos.belongsTo(models.Users);
    mensagensParaAlunos.belongsTo(models.Alunos);
  };
  return mensagensParaAlunos;
};
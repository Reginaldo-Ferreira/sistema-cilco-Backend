'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefones_alunos = sequelize.define('Telefones_alunos', {
    numero: DataTypes.STRING(15),
    nome_contato: DataTypes.STRING(45)
  }, {});
  Telefones_alunos.associate = function(models) {
    // associations can be defined here
    Telefones_alunos.belongsTo(models.Alunos); 
  };
  return Telefones_alunos;
};
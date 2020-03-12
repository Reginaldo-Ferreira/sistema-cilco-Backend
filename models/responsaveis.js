'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responsaveis = sequelize.define('Responsaveis', {
    name: DataTypes.STRING(45),
    ativo: DataTypes.BOOLEAN
  }, {});
  Responsaveis.associate = function(models) {
 
    Responsaveis.belongsTo(models.Alunos); 
    Responsaveis.belongsTo(models.Parentesco); 
  };
  return Responsaveis;
};
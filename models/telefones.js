'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefones = sequelize.define('Telefones', {
    numero: DataTypes.STRING(15),
    nome_contato: DataTypes.STRING(45)
  }, {});
  Telefones.associate = function(models) {
    Telefones.belongsTo(models.Users); 
  };
  return Telefones;
};
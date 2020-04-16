'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefones = sequelize.define('Telefones', {
    
    numero: { // (61)90000-1111
        type: DataTypes.STRING(25),
        allowNull: true,
    }, 
    nome_contato: DataTypes.STRING(45)
  }, {});
  Telefones.associate = function(models) {
    Telefones.belongsTo(models.Users, { foreignKey: "user_id" }); 
  };
  return Telefones;
};
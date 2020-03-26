'use strict';
module.exports = (sequelize, DataTypes) => {
  const Funcoes = sequelize.define('Funcoes', {
    descricao: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate:{
        notEmpty: {
          msg:`Esse campo não pode ser vazio`
        },
        len: {
          args:[4, 30],
          msg:"Esse campo deve ter entre 4 e 30 caracteres"
        }
      }
    },
      
    ativo: DataTypes.BOOLEAN
  }, {});
  Funcoes.associate = function(models) {
    // associations can be defined here
  //  Funcoes.hasMany(models.Users);
  };
  return Funcoes;
};
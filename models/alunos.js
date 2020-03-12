'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alunos = sequelize.define('Alunos', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING(20),
    rg: DataTypes.STRING(20),
    datanascimento: DataTypes.DATE,
    sexo: DataTypes.STRING(1),
    endereco: DataTypes.TEXT,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {});
  Alunos.associate = function(models) {
    // associations can be defined here
  };
  return Alunos;
};
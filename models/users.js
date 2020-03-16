'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING(50),
    email: DataTypes.STRING,
    cpf: DataTypes.STRING(20),
    rg: DataTypes.STRING(20),
    datanascimento: DataTypes.DATE,
    sexo: DataTypes.STRING(1),
    endereco: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN
  }, {});
  Users.associate = function(models) {
   // models.Funcoes.hasMany(Users);
    //Users.belongsTo(models.Funcoes);
    Users.belongsTo(models.Funcoes, {foreignKey: 'funcoes_id'} );

  };
  return Users;
};
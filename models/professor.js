'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professors', {
    ativo: DataTypes.BOOLEAN
  }, {});
  Professor.associate = function(models) {
    Professor.belongsTo(models.Users);
  };
  return Professor;
};
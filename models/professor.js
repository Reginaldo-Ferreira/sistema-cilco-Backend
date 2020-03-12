'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
   
  }, {});
  Professor.associate = function(models) {
    Professor.belongsTo(models.Users);
  };
  return Professor;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parentesco = sequelize.define('Parentesco', {
    name: DataTypes.STRING(15)
  }, {});
  Parentesco.associate = function(models) {
    // associations can be defined here
  };
  return Parentesco;
};
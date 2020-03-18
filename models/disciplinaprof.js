'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisciplinaProf = sequelize.define('DisciplinaProfs', {
    ativo: DataTypes.BOOLEAN
  }, {});
  DisciplinaProf.associate = function(models) {
    DisciplinaProf.belongsTo(models.Professors);
    DisciplinaProf.belongsTo(models.Diciplinas);
    DisciplinaProf.belongsTo(models.Periodos); 
  };
  return DisciplinaProf;
};
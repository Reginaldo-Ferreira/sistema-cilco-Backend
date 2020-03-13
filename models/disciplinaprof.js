'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisciplinaProf = sequelize.define('DisciplinaProfs', {
    id: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN
  }, {});
  DisciplinaProf.associate = function(models) {
    DisciplinaProf.belongsTo(models.Professors);
    DisciplinaProf.belongsTo(models.Diciplinas);
    DisciplinaProf.belongsTo(models.Periodos); 
  };
  return DisciplinaProf;
};
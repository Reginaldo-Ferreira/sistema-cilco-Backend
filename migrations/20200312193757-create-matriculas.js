'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      situacao: {
        type: Sequelize.BOOLEAN
      },
      trancado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      data_trancado: {
        type: Sequelize.DATE
      },
      semestre: {
        type: Sequelize.INTEGER
      },
      inicioSemest: {
        type: Sequelize.DATE
      },
      terminoSemest: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Matriculas');
  }
};
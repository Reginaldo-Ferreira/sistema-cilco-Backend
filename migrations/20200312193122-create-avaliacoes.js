'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Avaliacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bimestre: {
        type: Sequelize.INTEGER
      },
      projeto1: {
        type: Sequelize.FLOAT
      },
      projeto2: {
        type: Sequelize.FLOAT
      },
      prova: {
        type: Sequelize.FLOAT
      },
      provaRecuracao: {
        type: Sequelize.FLOAT
      },
      aprovado: {
        type: Sequelize.BOOLEAN
      },
      deRecuperacao: {
        type: Sequelize.BOOLEAN
      },
      totalFalta: {
        type: Sequelize.INTEGER
      },
      inicioBim: {
        type: Sequelize.DATE
      },
      terminoBim: {
        type: Sequelize.DATE
      },
      participacao: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Avaliacoes');
  }
};
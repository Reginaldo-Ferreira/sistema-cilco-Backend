'use strict';
const Validation = require("../util/Validation");
module.exports = (sequelize, DataTypes) => {
  const Alunos = sequelize.define('Alunos', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Esse campo não pode ser vazio`
        },
        len: {
          args: [4, 30],
          msg: "Esse campo deve ter entre 4 eté 30 caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Esse campo não pode ser vazio`
        },
        isEmail: {
          msg: "Esse campo deve teve ser um email"
        }
      }
    },
    cpf: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        validaCPF(value){
          let result = Validation.verificarCPF(value);
          if (!result) throw new Error(`Provavelmente esses numeros: ${ value } não é de um CPF Válido`);
        }  
       // is: {args: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,msg: `Provavelmente esses numeros não são de um CPF Válido` }
      }
    },
    rg: DataTypes.STRING(20),
    datanascimento: {
      type: DataTypes.DATE,
      allowNull: true,
      isDate: {
        msg: "Parece não ser uma data válida"
      }
    },
    sexo: DataTypes.STRING(1),
    endereco: DataTypes.TEXT,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Esse campo não pode ser vazio`
        },
        len: {
          args: [6],
          msg: "Esse campo deve ter mais de 6 Caracteres"
        },
        validaSenha_digitos_E_Letras(value){
          let result = Validation.verifLetrasDigitos(value);
          if (result.length > 0) throw new Error("Esse campo deve ter pelo menos " + result);
        }        
      }
    },
    role: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN
  }, {});
  Alunos.associate = function(models) {
    // associations can be defined here
  };
  return Alunos;
};
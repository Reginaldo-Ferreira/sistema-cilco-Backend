//var Plan = require("../models/plan");
var Database = require("../models/index");

class UsersService {
  constructor() {
    this.Users = Database["Users"];
    this.Funcoes = Database["Funcoes"];
  }

  async update(id, data) {
    var errors = {};
   // var isValid = this.validate(data, errors);
    //if (isValid) {
      try {
        var user = await this.getById(id);
        user.name = data.name;
        user.email = data.email;
        user.cpf = data.cpf;
        user.rg = data.rg;
        user.datanascimento = data.datanascimento;
        user.sexo = data.sexo;
        user.endereco = data.endereco;
        user.password = data.password;
        user.role = data.role;
        user.ativo = data.ativo;
        user.funcoes_id = data.funcao_id;

        await user.save();
        return { result: user };
      } catch (e) {
        errors.system_msg = "não foi possível editar o user";
        return { errors, e };
      }
   // } else {
      return { result: errors };
   // }
  }

  async listAll() {
    // no curso pelo professor o nome do method is getall()
    let result = {};
    var errors = {};
    try {
      result = await this.Users.findAll({
        include: [{ model: this.Funcoes }]
      }); //{ order: [["id", "DESC"]], limit: 4 }
      return result;
    } catch (e) {
      errors.system_msg = "não foi possível conectar com o banco";
      return { result, errors, e };
    }
  }

  async getById(id) {
    let result = {};
    var errors = {};
    try {
      result = await this.Users.findByPk(id, {
        include: [{ model: this.Funcoes }]
      });
      //console.log(result)
      if (result) {
        let newObj = Object.assign({}, result.dataValues); // remodelando o objeto de retorno
        return Object.assign(newObj, { Funco: newObj.Funco.descricao });
      } else {
        errors.system_msg = `Id: [ ${id} ] não encontrado`;
        return errors;
      }
    } catch (e) {
      errors.system_msg = "não foi possível conectar com o banco";
      return { errors, e };
    }
  }

  async store(users) {
    var errors = {};

   // var isValid = this.validate(users, errors);

    //if (isValid) {
      try {
        await this.Users.create(users);
        return { result: true };
      } catch (e) {
        errors.system_msg = "Não foi possível salvar o Usuário";
        return { errors, e };
      }
   // } else {
      return errors;
   // }
  }

  async activate(id, activate) {
    try {
      var user = await this.getById(id);
      user.ativo = activate; //ativa ou desativa nomeclatura correta é 'deactivated' , contudo ficará com o nome que já estava.
      await user.save();
      return { result: "sucess", id, activate };
    } catch (e) {
      return { id, e };
    }
  }

  async delete(id) { //deleção permanente
    try {
      await this.Users.destroy({
        where: {
            id: id
        }
    });
    return { result: "deleatado", id };
    } catch (e) {
      errors.system_msg = "Não foi possível deletar o Usuário";
      return { errors, id , e};
    }
  }
  

  validate(user, errors) {
    var erroCount = 0;
    if (user.name == undefined) {
      errors.name_msg = "o name é inválido";
      erroCount++;
    } else {
      if (user.name.length < 3) {
        errors.name_msg = "o name muito pequeno";
        erroCount++;
      }
    }

    if (user.email == undefined) {
      errors.email_msg = "O email é inválida";
      erroCount++;
    } else {
      if (user.email < 6) {
        errors.email_msg = "email muito curto é inválida";
        erroCount++;
      }
    }
    if (erroCount == 0) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = new UsersService();

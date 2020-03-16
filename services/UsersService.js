//var Plan = require("../models/plan");
var Database = require("../models/index");

class UsersService {
  constructor() {
    this.Users = Database["Users"];
  }

  async update(id, data) {
    var errors = {};
    var isValid = this.validate(data, errors);
    if (isValid) {
      try {
        var user = await this.getById(id);
//name, email, cpf, rg, datanascimento, sexo, endereco, password, role, ativo
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
        return user;
      } catch (error) {
        errors.system_msg = "não foi possível editar o user";
        return errors;
      }
    } else {
      return errors;
    }
  }

  async listAll() {
    // no curso pelo professor o nome do method is getall()
    let dbUsers = {};
    var errors = {};
    try {
      dbUsers = await this.Users.findAll(); //{ order: [["id", "DESC"]], limit: 4 }
      return dbUsers;
    } catch (e) {
      errors.system_msg = e;

      return errors;
    }
  }

  async getById(id) {
    let dbUser = {};
    var errors = {};
    try {
      dbUser = await this.Users.findByPk(id);
      if (dbUser) {
        return dbUser;
      } else {
        errors.system_msg = `Id: [ ${id} ] não encontrado`;
        return errors;
      }
    } catch (e) {
      errors.system_msg = e;
      return errors;
    }
  }

  async store(users) {
    var errors = {};

    var isValid = this.validate(users, errors);
    
    if (isValid) {
      try {
        await this.Users.create(users);
        return true;
      } catch (e) {
        errors.system_msg = "Não foi possível salvar o Usuário";
        return {errors,Tryerro: e};
      }
    } else {
      return errors;
    }
  }

  async activate(id, activate) {
    try {
      var user = await this.getById(id);
      user.ativo = activate; //ativa ou desativa nomeclatura correta é 'deactivated' , contudo ficará com o nome que já estava. 
      await user.save();
      return {status: "sucess", id, activate} ;
    } catch (error) {
      return {error, id} ;
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

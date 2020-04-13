//var Plan = require("../models/plan");
var Database = require("../models/index");
const Validation = require("../util/Validation");
const ConversorJson = require("../util/ConversorJson");


class UsersService {

  constructor() {
    this.Users = Database["Users"];
    this.Funcoes = Database["Funcoes"];
  }

  async update(id, data) { //validar update deixar campos vazio sem atualizar,modificar somente campos não vazios
    let errors = {status: "error"};
    
    var user = await this.getByIdInterno(id);
    ConversorJson.EndJson(user);//converte campo endereco json
    this.verificarCamposVazios(data, user);//atualiza somente campos que foram passados no 'data'
    user = ConversorJson.EndString(user);//converte o campo endereco em string pra salva no banco
    await user.save();
    return { status: "sucess", data, user};// retorna o objeto anterior e o modificado
  }

  async listAll(fildsArray) {
    //retirar opção senha
    fildsArray =this.retirarCampoSenha(fildsArray);
    console.log(fildsArray);
    let errors = {status: "error"};
    
    // no curso pelo professor o nome do method is getall()
    try {
     let users = await this.Users.findAll({
       attributes: fildsArray, //attributes: fildsArray, exclude: ['password','name'],
       include: [{ model: this.Funcoes }]
      }); //{ order: [["id", "DESC"]], limit: 4 }
      return { status: "sucess", users};// retorna o objeto anterior e o modificado
    } catch (e) { 
     
      errors.system_msg = {msg:"não foi possível listar os usuários", where: this.constructor.name };
      errors.system_sgbd = e;
     // console.log(ob);
      return errors;
    }
  }

  retirarCampoSenha(campo){
    return campo.filter(camp => camp !=  'password');
  }

  async getByIdInterno(id){
    try {
      return await this.Users.findByPk(id, {
        include: [{ model: this.Funcoes }] 
      });//console.log(result) 
    } catch (e) {
      return e;
    }
  }
  async getById(id) {
    
    let errors = {status: "error"};

    try {

      let user = await this.Users.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [{ model: this.Funcoes }] 
      });//console.log(result)
      if (user) {
        Object.assign(user, { Funco: user.Funco.descricao });
        return {status: "sucess", user};
      } else {
        errors.system_msg = {msg: `Id: [ ${id} ] não encontrado`, where: this.constructor.name };
        return errors;
      }
    } catch (e) {
      errors.system_msg = {msg:`não foi possível trazer o usuário [ ${ id } ] `, where: this.constructor.name };
      errors.system_sgbd = e;

      return errors;
    }
  }

  async store(users) {
    let errors = {result: "error"};

    var res = await Validation.checkExistence(this.Users, [{cpf: users.cpf},{email: users.email}]);
    //console.log(res);

    if(res.cpf === true || res.email === true){ //caso exista
      var textResposta = res.cpf?'CPF já cadastrado':'' + res.email?' Email já cadastrado':'' ;
      return errors.system_msg = {msg:`Não foi possível criar o Usuário [ ${ textResposta } ]`, where: this.constructor.name };
    }
      try {   
        await this.Users.create(users);
        var userId = await Validation.checkExistence(this.Users, [{email: users.email}]);// verifica se foi criado
       // console.log(UserId);
        return { result: "sucess" , id: userId.id};

      } catch (e) {

        errors.system_msg = {msg:`Não foi possível criar o Usuário [ ${users.nome} ]`, where: this.constructor.name };
        errors.system_sgbd = e;

        return errors;
      }
  }

  async activate(id, activate) {
    let errors = {result: "error"};
    let result = {};
    errors.system_msg = {msg:` Não foi possível ${ activate } [ ${id} ]`, where: this.constructor.name };
    try {
      
      var user = await this.getById(id);
      if(user.system_sgbd.name === "SequelizeConnectionRefusedError"){
        errors.system_sgbd = user.system_sgbd;
        result = errors;
      }else{
        user.ativo = activate; //ativa ou desativa nomeclatura correta é 'deactivated' , contudo ficará com o nome que já estava.
        await user.save();
        result = { result: "sucess", id, activate };
      }
      //return { result: "sucess", id, activate };
    } catch (e) {
      errors.system_sgbd = e;
      result = errors;
    }finally{
      return result;
    }
  }

  async delete(id) { //deleção permanente
    let errors = {result: "error"};
    let resp;
    try {
     resp = await this.Users.destroy({
        where: { id }
    });
    if (resp) {
      return { result: "sucess", id };
    } else {
      errors.result = "error";
      errors.system_msg = { msg: `Não foi possível deletar o Usuário [ ${id} ] esse não existe`, where: this.constructor.name };

      return errors;
    }


    } catch (e) {
      errors.system_msg = { msg: `Não foi possível deletar o Usuário [ ${id} ]`, where: this.constructor.name };
      errors.system_sgbd = e;

      return errors;
    }
  }

   verificarCamposVazios(dadosAtualizados, linhaDoSGBD){
   // verifica se tem campos vazios e altera somente os que existem..
       for (const property in dadosAtualizados) {
         if(property == 'endereco' ) {
           this.verificarCamposVazios(dadosAtualizados[property], linhaDoSGBD[property]);
        }else {
          if (dadosAtualizados[property] != '' && dadosAtualizados[property] != null ) {
            linhaDoSGBD[property] = dadosAtualizados[property];
          }
        }
      }
  }

}
module.exports = new UsersService();

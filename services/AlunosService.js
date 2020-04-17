//var Plan = require("../models/plan");
var Database = require("../models/index");
const Validation = require("../util/Validation");
const ConversorJson = require("../util/ConversorJson");


class AlunosService {

  constructor() {
    this.Alunos = Database["Alunos"];
   // this.Funcoes = Database["Funcoes"];
  }

  async update(id, data) { //validar update deixar campos vazio sem atualizar,modificar somente campos não vazios
    let errors = {status: "error"};
    
    var aluno = await this.getByIdInterno(id);
    ConversorJson.EndJson(aluno);//converte campo endereco json
    this.verificarCamposVazios(data, aluno);//atualiza somente campos que foram passados no 'data'
    aluno = ConversorJson.EndString(aluno);//converte o campo endereco em string pra salva no banco
    await aluno.save();
    return { status: "sucess", data, aluno};// retorna o objeto anterior e o modificado
  }

  async listAll(fildsArray) {
   
    
    if (fildsArray === null ) {
      fildsArray =  { exclude: ['password'] }; //retirar opção senha
    }else{
      fildsArray = this.retirarCampoSenha(fildsArray);
    }

    let errors = {status: "error"};
    
    // no curso pelo professor o nome do method is getall()
    try {
     let alunos = await this.Alunos.findAll({
       attributes: fildsArray /* , //attributes: fildsArray, exclude: ['password','name'],
       include: [{ model: this.Funcoes }] */
      }); //{ order: [["id", "DESC"]], limit: 4 }
      return { status: "sucess", alunos};// retorna o objeto anterior e o modificado
    } catch (e) { 
     
      errors.system_msg = {msg:"não foi possível listar os alunos", where: this.constructor.name };
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
      return await this.Alunos.findByPk(id,/*  {
        include: [{ model: this.Funcoes }] 
      } */);//console.log(result) 
    } catch (e) {
      return e;
    }
  }

  async getById(id) {
    
    let errors = {status: "error"};

    try {

      let aluno = await this.Alunos.findByPk(id, {
        attributes: { exclude: ['password'] }/* ,
        include: [{ model: this.Funcoes }]  */
      });//console.log(result)
     /*  if (aluno) {
        Object.assign(aluno, { Funco: aluno.Funco.descricao });
      } */
      return {status: "sucess", aluno};
    } catch (e) {
      errors.system_msg = {msg:`não foi possível trazer o aluno [ ${ id } ] `, where: this.constructor.name };
      errors.system_sgbd = e;

      return errors;
    }
  }

  async store(alunos) {
    let errors = {result: "error"};

    var res = await Validation.checkExistence(this.Alunos, [{cpf: alunos.cpf},{email: alunos.email}]);
    //console.log("res:  ---> ",alunos);

    if(res.cpf === true || res.email === true){ //caso exista
      var textResposta = res.cpf?'CPF já cadastrado':'' + res.email?' Email já cadastrado':'' ;
      return errors.system_msg = {msg:`Não foi possível criar o Usuário [ ${ textResposta } ]`, where: this.constructor.name };
    }
      try {
        await this.Alunos.create(alunos);
        var alunoId = await Validation.checkExistence(this.Alunos, [{email: alunos.email}]);// verifica se foi criado
       // console.log(UserId);
        return { result: "sucess" , id: alunoId.id};

      } catch (e) {

        errors.system_msg = {msg:`Não foi possível criar o Aluno [ ${alunos.nome} ]`, where: this.constructor.name };
        errors.system_sgbd = e;

        return errors;
      }
  }

  async activate(id, activate) {
    let errors = {result: "error"};
    let result = {};
    errors.system_msg = {msg:` Não foi possível ${ activate } [ ${id} ]`, where: this.constructor.name };
    try {
      
      var aluno = await this.getById(id);
      if(aluno.system_sgbd.name === "SequelizeConnectionRefusedError"){
        errors.system_sgbd = aluno.system_sgbd;
        result = errors;
      }else{
        aluno.ativo = activate; //ativa ou desativa nomeclatura correta é 'deactivated' , contudo ficará com o nome que já estava.
        await aluno.save();
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
     resp = await this.Alunos.destroy({
        where: { id }
    });
  
    if (resp) {
      return { result: "sucess", id };
    } else {
      errors.result = "error";
      errors.system_msg = { msg: `Não foi possível deletar o aluno [ ${id} ] esse não existe`, where: this.constructor.name };

      return errors;
    }

    } catch (e) {
      errors.system_msg = { msg: `Não foi possível deletar o aluno [ ${id} ]`, where: this.constructor.name };
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
module.exports = new AlunosService();

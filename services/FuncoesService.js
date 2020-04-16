var Database = require("../models/index");
const Validation = require("../util/Validation");

class FuncoesService {
    constructor() {
      this.Funcoes = Database["Funcoes"];
    }

    async store(funcoes) {
      let errors = {result: "error"};

          try {
            await this.Funcoes.create(funcoes);
            var funcoeId = await Validation.checkExistence(this.Funcoes, [{descricao: funcoes.descricao}]);// verifica se foi criado
            return { result: "sucess" , id: funcoeId.id};
          } catch (e) {
            errors.system_msg = {msg:`Não foi possível criar esta função [ ${funcoes.descricao} ]`, where: this.constructor.name };
            errors.system_sgbd = e;
    
            return errors;
          }
      }

    async getall() {
        let errors = {status: "error"};

        try {
          let func = await this.Funcoes.findAll(); //{ order: [["id", "DESC"]], limit: 4 }
          return { status: "sucess", func};// retorna o objeto anterior e o modificado
        } catch (e) {
          errors.system_msg = {msg:"não foi possível listar funções", where: this.constructor.name };
          errors.system_sgbd = e;
          return errors;
        }
    }

    async getById(id){
      let errors = {status: "error"};
    try {
      let func = await this.Funcoes.findByPk(id);
      return {status: "sucess", func};
    } catch (e) {
      errors.system_msg = {msg:`não foi possível trazer a função [ ${ id } ] `, where: this.constructor.name };
      errors.system_sgbd = e;

      return errors;
    }
    }

    async delete(id){
      let errors = {result: "error"};
      let func;
      try {
        func = await this.Funcoes.destroy({
          where: { id }
      });
      if (func) {
        return { result: "sucess", id };
      } else {
        errors.result = "error";
        errors.system_msg = { msg: `Não foi possível deletar esta função [ ${id} ] esse não existe`, where: this.constructor.name };
  
        return errors;
      }

      } catch (e) {
        errors.system_msg = { msg: `Não foi possível deletar a função [ ${id} ]`, where: this.constructor.name };
        errors.system_sgbd = e;
        return errors;
      }
    }

    async update(id, data) { //validar update deixar campos vazio sem atualizar,modificar somente campos não vazios
      let errors = {status: "error"};
      
      var func = await this.getByIdInterno(id);

      this.verificarCamposVazios(data, func);//atualiza somente campos que foram passados no 'data'

      await func.save();
      return { status: "sucess", data, func};// retorna o objeto anterior e o modificado
    }

    async getByIdInterno(id){
      try {
        return await this.Funcoes.findByPk(id);//console.log(result) 
      } catch (e) {
        return e;
      }
    }

    verificarCamposVazios(dadosAtualizados, linhaDoSGBD){
      // verifica se tem campos vazios e altera somente os que existem..
          for (const property in dadosAtualizados) {
             if (dadosAtualizados[property] != '' && dadosAtualizados[property] != null ) {
               linhaDoSGBD[property] = dadosAtualizados[property];
             }
         }
    }
      

}

module.exports = new FuncoesService();
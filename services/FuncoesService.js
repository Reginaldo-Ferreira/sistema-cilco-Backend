var Database = require("../models/index");


class FuncoesService {
    constructor() {
      this.Funcoes = Database["Funcoes"];
    }

    async store(funcoes) {
       // var errors = {};
       // var isValid = this.validate(funcoes, errors);
    
       // if (isValid) {
          try {
            
            await this.Funcoes.create(funcoes);
            return {return: true};
          } catch (e) {
          //  errors.system_msg = "Não foi possível salvar o funcoes";
            return e;
          }
     //   } else {
        //  return errors;
       // }
      }

      async getall() {
        let funcoes = {};
        try {
          funcoes = await this.Funcoes.findAll(); //{ order: [["id", "DESC"]], limit: 4 }
          return funcoes;
        } catch (e) {
          return e;
        }
      }

}

module.exports = new FuncoesService();
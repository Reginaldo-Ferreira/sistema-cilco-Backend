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
            return {result: true};
          } catch (errors) {
          //  errors.system_msg = "Não foi possível salvar o funcoes";
            return { result: errors };
          }
     //   } else {
        //  return errors;
       // }
      }

      async getall() {
        let result = {};
        try {

          result = await this.Funcoes.findAll(); //{ order: [["id", "DESC"]], limit: 4 }
          return result;
        } catch (errors) {
          return {result,errors};
        }
      }

      

}

module.exports = new FuncoesService();
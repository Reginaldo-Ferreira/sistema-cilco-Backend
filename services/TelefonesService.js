var Database = require("../models/index");
const Validation = require("../util/Validation");

class TelefonesService {
    constructor() {
      this.Telefones = Database["Telefones"];
      this.Users = Database["Users"];
    }

    async store(Telefones) {
      let errors = {result: "error"};

          try {
            await this.Telefones.create(Telefones);
            var telefoneId = await Validation.checkExistence(this.Telefones, [{numero: Telefones.numero}]);// verifica se foi criado
            return { result: "sucess" , telefoneId};
          } catch (e) {
            errors.system_msg = {msg:`Não foi possível salvar este telefone [ ${Telefones.numero} ]`, where: this.constructor.name };
            errors.system_sgbd = e;
    
            return errors;
          }
      }

    async getall() {
        let errors = {status: "error"};

      //  try {
          let func = await this.Telefones.findAll({
            include: [{
              model: this.Users,
              attributes: [ 'name', 'email' ],
              right: true
            }]
           
          }); //{ order: [["id", "DESC"]], limit: 4 }
          return { status: "sucess", func};// retorna o objeto anterior e o modificado
        /* } catch (e) {
          errors.system_msg = {msg:"não foi possível listar Telefones", where: this.constructor.name };
          errors.system_sgbd = e;
          return errors;
        } */
    }

    async getById(id){ // busca o id do user
      let errors = {status: "error"};
      try {
        let telefone = await this.Telefones.findAll({
          where: { user_id: id },
          include: [{ 
            model: this.Users,
            right: true,
            attributes: ["name","id"] 
          }]
        });//associação...........................
        return {status: "sucess", telefone};
      } catch (e) {
        errors.system_msg = {msg:`não foi possível trazer o numero [ ${ id } ] `, where: this.constructor.name };
        errors.system_sgbd = e;

        return errors;
      }
    }

    async delete(id){
      let errors = {result: "error"};
      let func;
      try {
        func = await this.Telefones.destroy({
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
      
      var telefone = await this.getByIdInterno(id);

      this.verificarCamposVazios(data, telefone);//atualiza somente campos que foram passados no 'data'
      await telefone.save();
      return { status: "sucess", data, telefone};// retorna o objeto anterior e o modificado
    }

    async getByIdInterno(id){
      try {
        return await this.Telefones.findByPk(id);//console.log(result) 
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

module.exports = new TelefonesService();
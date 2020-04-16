const UsersService = require("../services/UsersService");
const ConversorJson = require("../util/ConversorJson");

class UsersController {
  async index(req, res) {
    var arrCampos = req.query.fild.split(","); 
    let result = {};
      result = await UsersService.listAll(arrCampos); // getall()
      res.json(result);
  }

  async store(req, res) {
    var user = { ...req.body };
    /////var Users = { name, email, cpf, rg, datanascimento, sexo, endereco, password, role, ativo } = req.body;
    var result = await UsersService.store(ConversorJson.EndString(user));
      res.json(result);
      
  }

  async update(req, res) {

    var user = { ...req.body };
   // user = ConversorJson.EndString(user);
    var result = await UsersService.update(user.id, user);
    
    if (result == true) {
      res.json({ id, result });
    } else {
      res.json({ result });
    }

  }

  async getById(req, res) {
   
    let result = await UsersService.getById(req.params.id);
   // ConversorJson.EndJson(user)
   if(result.status !== "error"){
    let PropriedadeEnderecoConvertidoJson = ConversorJson.EndJson(result.user);
     Object.assign(result, {user: PropriedadeEnderecoConvertidoJson});
   // user = ConversorJson.EndJson(user.user);
   }
    res.json(result);
  }

async deletePermanently(req, res){
  res.json( await UsersService.delete(req.params.id));
}

  async active(req, res) {
    var id = req.params.id;
    var activate = req.params.activate; // varlor boolean
    var result = await UsersService.activate(id, activate);
    res.json(result); //ok
  }
}

module.exports = new UsersController();

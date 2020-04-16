const FuncoesService = require("../services/FuncoesService");

class FuncoesController {

  async store(req, res) {
    let result = {};
    var Funcoes = { ...req.body };
    result = await FuncoesService.store(Funcoes);
    res.json(result);
  }

  async index(req, res) {
    let result = {};
    result = await FuncoesService.getall(); // getall()
    res.json(result);
  }

  async getById(req, res) {
    let result = await FuncoesService.getById(req.params.id);
    res.json(result);
  }
  
  async update(req, res) {

    var func = { ...req.body };
    console.log("controller : ", func);
   // user = ConversorJson.EndString(user);
  
    var result = await FuncoesService.update(func.id, func);
    //res.json(plan);
    if (result == true) {
      res.json({ id, result });
    } else {
      res.json({ result });
    }
  }

  async deletePermanently(req, res){
    res.json( await FuncoesService.delete(req.params.id));
  }

  

}
module.exports = new FuncoesController();

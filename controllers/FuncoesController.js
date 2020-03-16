const FuncoesService = require("../services/FuncoesService");

class FuncoesController {

  async store(req, res) {
   
    var Funcoes = { ...req.body };
    var result = await FuncoesService.store(Funcoes);

    if (result == true) {
      res.json(result);
    } else {
       res.json(result);
    }
  }

  async index(req, res) {
    let Funcoes = {};
    try {
      Funcoes = await FuncoesService.getall(); // getall()
        res.json(Funcoes);
    } catch (e) {
      res.json(e);
    } finally {

    }
  }
}
module.exports = new FuncoesController();

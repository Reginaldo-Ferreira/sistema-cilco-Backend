const FuncoesService = require("../services/FuncoesService");

class FuncoesController {

  async store(req, res) {
    let result = {};
    var Funcoes = { ...req.body };
    try {
      result = await FuncoesService.store(Funcoes);
      res.json(result);
    } catch (error) {
      res.json({result, error});
    }
  }

  async index(req, res) {
    let result = {};
    try {
      result = await FuncoesService.getall(); // getall()
        res.json(result);
    } catch (error) {
      res.json({result, error });
    } //finally {}
  }
}
module.exports = new FuncoesController();

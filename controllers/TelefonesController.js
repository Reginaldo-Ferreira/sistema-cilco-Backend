const TelefonesService = require("../services/TelefonesService");

class TelefonesController {

  async store(req, res) {
    let result = {};
    var Telefones = { ...req.body };
    result = await TelefonesService.store(Telefones);
    res.json(result);
  }

  async index(req, res) {
    let result = {};
    result = await TelefonesService.getall(); // getall()
    res.json(result);
  }

  async getById(req, res) {
    let result = await TelefonesService.getById(req.params.id);
    res.json(result);
  }
  
  async update(req, res) {

    var telef = { ...req.body };
   // user = ConversorJson.EndString(user);
  
    var result = await TelefonesService.update(telef.id, telef);
    //res.json(plan);
    if (result == true) {
      res.json({ id, result });
    } else {
      res.json({ result });
    }
  }

  async deletePermanently(req, res){
    res.json( await TelefonesService.delete(req.params.id));
  }

}
module.exports = new TelefonesController();

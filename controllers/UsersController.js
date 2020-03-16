const UsersService = require("../services/UsersService");

class UsersController {
  async index(req, res) {
    let Users = {};
    let erro = {};

    try {
      Users = await UsersService.listAll(); // getall()
      // res.json(plans);

      if (Users.system_msg == undefined) {
        res.json(Users);
      } else {
        res.json(Users);
        // res.json("Houve um erro: \n" + JSON.stringify(plans));
      }
    } catch (e) {
      res.json(e);
    } finally {
    }
  
  }

  async store(req, res) {
    var Users = { ...req.body };
    //var Users = { name, email, cpf, rg, datanascimento, sexo, endereco, password, role, ativo } = req.body;

    // var Users = { title, list, client, value, import: imports };
    //   var Users = { ...req.body };
    var result = await UsersService.store(Users);
    //res.json(plan);
    if (result == true) {
      res.json(result);
    } else {
      res.json(result);

    }
  }

  async update(req, res) {
    var users = { ...req.body };
    var result = await UsersService.update(users.id, users);
    //res.json(plan);
    if (result == true) {
      res.json({ id, result });
    } else {
      res.json({ result });
    }
  }

  async getById(req, res) {
    let user = {};
    user = await UsersService.getById(req.params.id);
    res.json(user);
  }



  async active(req, res) {
    var id = req.params.id;
    var activate = req.params.activate; // varlor boolean
   var result = await UsersService.activate(id, activate);
    res.json(result); //ok
  }
}

module.exports = new UsersController();

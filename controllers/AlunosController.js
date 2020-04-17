const AlunosService = require("../services/AlunosService");
const ConversorJson = require("../util/ConversorJson");

class AlunosController {
  async index(req, res) {

    var arrCampos = null;

    if (req.query.fild != null) {
      arrCampos = req.query.fild.split(","); 
    }

    let result = {};
      result = await AlunosService.listAll(arrCampos); // getall()
      res.json(result);
  }

  async store(req, res) {
    var aluno = { ...req.body };
    /////var Alunos = { name, email, cpf, rg, datanascimento, sexo, endereco, password, role, ativo } = req.body;
    var result = await AlunosService.store(ConversorJson.EndString(aluno));
      res.json(result);
      
  }

  async update(req, res) {

    var aluno = { ...req.body };
   // aluno = ConversorJson.EndString(aluno);
    var result = await AlunosService.update(aluno.id, aluno);
    
    if (result == true) {
      res.json({ id, result });
    } else {
      res.json({ result });
    }

  }

  async getById(req, res) {
   
    let result = await AlunosService.getById(req.params.id);
   // ConversorJson.EndJson(aluno)


   if(result.status !== "error" && result.aluno !== null || result.aluno !== null ){
    let PropriedadeEnderecoConvertidoJson = ConversorJson.EndJson(result.aluno);
     Object.assign(result, {aluno: PropriedadeEnderecoConvertidoJson});
   }

    res.json(result);
  }

async deletePermanently(req, res){
  res.json( await AlunosService.delete(req.params.id));
}

  async active(req, res) {
    var id = req.params.id;
    var activate = req.params.activate; // varlor boolean
    var result = await AlunosService.activate(id, activate);
    res.json(result); //ok
  }
}

module.exports = new AlunosController();

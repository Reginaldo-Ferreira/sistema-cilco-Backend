var express = require("express");
var router = express.Router();
var AlunosController = require("../controllers/AlunosController");

router.get("/alunos", AlunosController.index); // list
router.get("/aluno/:id", AlunosController.getById); // details one by id
//router.get("/admin/Alunos/edit/:id", AlunosController.edit);
        //"/plans/update"
//router.post("/Alunos/update", AlunosController.update);
router.put("/aluno", AlunosController.update);//update
//router.put("/user", (req, res)=>{console.log("router : -------->",req); });
router.post("/aluno", AlunosController.store); //create

//INVERTER VERBOS HTTP POST CRIA E PUT ATUALIZA
//PUT normalmente é usado para atualizar algo e o POST para criar
router.get("/aluno/activate/:id/:activate", AlunosController.active);
router.delete("/aluno/:id",AlunosController.deletePermanently)
module.exports = router;
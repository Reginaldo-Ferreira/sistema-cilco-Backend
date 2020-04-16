var express = require("express");
var router = express.Router();
var FuncoesController = require("../controllers/FuncoesController");

router.get("/funcoes", FuncoesController.index); // return all of list
router.get("/funcao/:id", FuncoesController.getById); // details one by id
router.post("/funcoes", FuncoesController.store); //create
router.put("/funcao", FuncoesController.update);//update
router.delete("/funcao/:id",FuncoesController.deletePermanently);

module.exports = router;
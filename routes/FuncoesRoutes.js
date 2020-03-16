var express = require("express");
var router = express.Router();
var FuncoesController = require("../controllers/FuncoesController");

router.get("/funcoes", FuncoesController.index); // return all of list
router.post("/funcoes", FuncoesController.store); //create

module.exports = router;
var express = require("express");
var router = express.Router();
var TelefonesController = require("../controllers/TelefonesController");

router.get("/telefones", TelefonesController.index); // return all of list
router.get("/telefone/:id", TelefonesController.getById); // details one by id
router.post("/telefone", TelefonesController.store); //create
router.put("/telefone", TelefonesController.update);//update
router.delete("/telefone/:id",TelefonesController.deletePermanently);

module.exports = router;
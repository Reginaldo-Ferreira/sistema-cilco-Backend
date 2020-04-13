var express = require("express");
var router = express.Router();
var UsersController = require("../controllers/UsersController");

router.get("/users", UsersController.index); // list
router.get("/user/:id", UsersController.getById); // details one by id
//router.get("/admin/users/edit/:id", UsersController.edit);
        //"/plans/update"
//router.post("/users/update", UsersController.update);
router.put("/user", UsersController.update);//update
//router.put("/user", (req, res)=>{console.log("router : -------->",req); });
router.post("/user", UsersController.store); //create

//INVERTER VERBOS HTTP POST CRIA E PUT ATUALIZA
//PUT normalmente é usado para atualizar algo e o POST para criar
router.get("/user/activate/:id/:activate", UsersController.active);
router.delete("/user/:id",UsersController.deletePermanently)
module.exports = router;
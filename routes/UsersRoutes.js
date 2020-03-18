var express = require("express");
var router = express.Router();
var UsersController = require("../controllers/UsersController");

router.get("/admin/users", UsersController.index); // list
router.get("/admin/users/:id", UsersController.getById); // details one by id
//router.get("/admin/users/edit/:id", UsersController.edit);
        //"/plans/update"
//router.post("/users/update", UsersController.update);
router.post("/users", UsersController.update);//update
router.put("/users", UsersController.store); //create

router.get("/users/activate/:id/:activate", UsersController.active);
module.exports = router;
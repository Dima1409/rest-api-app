const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegister, joiLogin } = require("../../models/user");

router.post("/register", validation(joiRegister), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLogin), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;

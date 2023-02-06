const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, authorization } = require("../../middlewares");
const { auth } = require("../../controllers");
const { joiRegister, joiLogin } = require("../../models/user");

router.post("/register", validation(joiRegister), ctrlWrapper(auth.register));

router.post("/login", validation(joiLogin), ctrlWrapper(auth.login));

router.get("/logout", authorization, ctrlWrapper(auth.logout));

module.exports = router;

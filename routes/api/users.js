const express = require("express");

const {authorization, ctrlWrapper} = require("../../middlewares");
const {users} = require("../../controllers");

const router = express.Router();

router.get("/current", authorization, ctrlWrapper(users.getCurrent));

module.exports = router;
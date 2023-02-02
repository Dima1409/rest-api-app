const express = require("express");

const { authorization, ctrlWrapper, validation } = require("../../middlewares");
const { users } = require("../../controllers");
const { userUpdate } = require("../../models/user");

const router = express.Router();

router.get("/current", authorization, ctrlWrapper(users.getCurrent));

router.patch(
  "/",
  authorization,
  validation(userUpdate),
  ctrlWrapper(users.updateSubscription)
);

module.exports = router;

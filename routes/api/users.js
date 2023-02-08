const express = require("express");

const {
  authorization,
  upload,
  ctrlWrapper,
  validation,
} = require("../../middlewares");
const { users } = require("../../controllers");
const { userUpdate } = require("../../models/user");

const router = express.Router();

router.get("/current", authorization, ctrlWrapper(users.getCurrent));

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrlWrapper(users.updateAvatar)
);

router.patch(
  "/",
  authorization,
  validation(userUpdate),
  ctrlWrapper(users.updateSubscription)
);

module.exports = router;

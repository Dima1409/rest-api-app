const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");

const { validation, ctrlWrapper, authorization } = require("../../middlewares");
const {
  joiContactSchema,
  joiContactSchemaUpdate,
  favoriteSchema,
} = require("../../models/contact");

router.get("/", authorization, ctrlWrapper(contacts.getAll));

router.get("/:contactId", authorization, ctrlWrapper(contacts.getById));

router.post(
  "/",
  authorization,
  validation(joiContactSchema),
  ctrlWrapper(contacts.post)
);

router.delete("/:contactId", authorization, ctrlWrapper(contacts.remove));

router.put(
  "/:contactId",
  authorization,
  validation(joiContactSchemaUpdate),
  ctrlWrapper(contacts.update)
);

router.patch(
  "/:contactId/favorite",
  authorization,
  validation(favoriteSchema),
  ctrlWrapper(contacts.updateFavorite)
);

module.exports = router;

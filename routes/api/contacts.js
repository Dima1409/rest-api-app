const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const {
  joiContactSchema,
  joiContactSchemaUpdate,
  favoriteSchema,
} = require("../../models/contact");

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.post("/", validation(joiContactSchema), ctrlWrapper(contacts.post));

router.delete("/:contactId", ctrlWrapper(contacts.remove));

router.put(
  "/:contactId",
  validation(joiContactSchemaUpdate),
  ctrlWrapper(contacts.update)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrlWrapper(contacts.updateFavorite)
);

module.exports = router;

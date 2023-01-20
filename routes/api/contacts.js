const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema, contactSchemaUpdate } = require("../../schemas");

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.post("/", validation(contactSchema), ctrlWrapper(contacts.post));

router.delete("/:contactId", ctrlWrapper(contacts.remove));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(contacts.update)
);

router.patch(
  "/:contactId",
  validation(contactSchemaUpdate),
  ctrlWrapper(contacts.patch)
);

module.exports = router;

const contactsOperations = require("../../models/contacts");

const post = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    message: "Contact added",
    data: {
      result,
    },
  });
};

module.exports = post;

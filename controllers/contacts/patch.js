const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const patch = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    message: "Contact edited",
    data: {
      result,
    },
  });
};

module.exports = patch;

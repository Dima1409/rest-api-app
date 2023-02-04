const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner: _id });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;

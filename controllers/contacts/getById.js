const {Contact} = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};

module.exports = getById;

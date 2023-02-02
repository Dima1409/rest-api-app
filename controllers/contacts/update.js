const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { isOwner } = require("../../middlewares");

const update = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const findById = await Contact.findById(contactId);
  isOwner(_id, findById.owner);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    message: "Contact updated",
    data: {
      result,
    },
  });
};

module.exports = update;

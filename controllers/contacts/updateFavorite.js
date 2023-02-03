const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { isOwner } = require("../../middlewares");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const findById = await Contact.findById(contactId);
  await isOwner(_id, findById.owner);
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  console.log(result);
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

module.exports = updateFavorite;

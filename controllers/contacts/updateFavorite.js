const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
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

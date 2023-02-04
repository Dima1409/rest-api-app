const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const update = async (req, res) => {
  const { contactId } = req.params;
  console.log(typeof contactId);
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );
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
